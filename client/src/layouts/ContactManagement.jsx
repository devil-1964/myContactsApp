import { useEffect, useState } from "react";
import { Plus, Search, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import ProtectedRoute from "@/context/ProtectedRoute";
import axios from "axios";
import { toast } from 'react-hot-toast';

const ContactsManagement = () => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [previewContact, setPreviewContact] = useState(null);
  const fetchContacts = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("No token found in local storage.");
      return;
    }
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/contacts/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setContacts(response.data); 
      // console.log("Fetched contacts:", response.data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };


  useEffect(() => {
    fetchContacts();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddContact = async (newContact) => {
    const token = localStorage.getItem("accessToken"); 

    if (!token) {
      console.error("No token found in local storage.");
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/contacts/`, newContact, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("Contact added successfully:", response.data);
      toast.success("Contact added successfully.");
      setContacts([...contacts, response.data]);
    } catch (error) {
      console.error("Error adding contact:", error.response ? error.response.data : error.message);
      toast.error("Error adding contact.");
    }
  };

  const handleEditContact = async (id, updatedContact) => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      console.error("No token found in local storage.");
      return;
    }

    try {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/contacts/${id}`, updatedContact, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setContacts(
        contacts.map((contact) =>
          contact._id === id ? { ...contact, ...response.data } : contact
        )
      );
      toast.success("Contact updated successfully!");
      await fetchContacts();
    } catch (error) {
      console.error("Error updating contact:", error.response ? error.response.data : error.message);
      toast.error("Failed to update contact.");
    }

    setPreviewContact(null);
  };

  const handleDeleteContact = async (id) => {
    const token = localStorage.getItem("accessToken"); 

    if (!token) {
      console.error("No token found in local storage.");
      return;
    }

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/contacts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("Contact deleted successfully:");
      toast.success("Contact deleted successfully!");
      setContacts(contacts.filter((contact) => contact._id !== id));
      setPreviewContact(null);
    } catch (error) {
      console.error("Error deleting contact:", error.response ? error.response.data : error.message);
      toast.error("Failed to delete contact.");
    }
  };


  return (
    <ProtectedRoute>
      <div className="container mx-auto pt-32">
        <h1 className="text-2xl font-bold mb-4">Contacts</h1>
        <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search contacts"
              className="pl-8"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Contact
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Contact</DialogTitle>
              </DialogHeader>
              <ContactForm onSubmit={handleAddContact} />
            </DialogContent>
          </Dialog>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredContacts.map((contact) => (
              <TableRow key={contact._id}>
                <TableCell>{contact.name}</TableCell>
                <TableCell className="hidden md:table-cell">{contact.email}</TableCell>
                <TableCell>{contact.phone}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Eye color="grey" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Contact Preview</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <strong>Name:</strong> {contact.name}
                        </div>
                        <div>
                          <strong>Email:</strong> {contact.email}
                        </div>
                        <div>
                          <strong>Phone:</strong> {contact.phone}
                        </div>
                        <div className="flex space-x-3">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button className="bg-blue-500 text-white hover:bg-blue-600 px-3 py-1.5 rounded shadow-md transition duration-300">
                                Edit
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="p-6 rounded-lg shadow-lg ">
                              <DialogHeader>
                                <DialogTitle className="text-xl font-semibold text-gray-200">
                                  Edit Contact
                                </DialogTitle>
                              </DialogHeader>
                              <ContactForm
                                onSubmit={(updatedContact) =>
                                  handleEditContact(contact._id, updatedContact)
                                }
                                initialData={contact}
                              />
                            </DialogContent>
                          </Dialog>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="destructive"
                                className="bg-red-500 text-white hover:bg-red-600 px-3 py-1.5 rounded shadow-md transition duration-300"
                              >
                                Delete
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="p-6 rounded-lg shadow-lg text-center">
                              <AlertDialogHeader>
                                <AlertDialogTitle className="text-xl font-semibold text-gray-200">
                                  Are you sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription className="text-gray-600 mt-2">
                                  This action cannot be undone. This will permanently delete the contact.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter className="flex justify-center space-x-4 mt-4">
                                <AlertDialogCancel asChild>
                                  <Button className="bg-gray-300 text-gray-800 hover:bg-gray-400 px-4 py-1.5 rounded transition duration-300">
                                    Cancel
                                  </Button>
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  asChild
                                  onClick={() => handleDeleteContact(contact._id)}
                                >
                                  <Button className="bg-red-500 text-white hover:bg-red-600 px-4 py-1.5 rounded shadow-md transition duration-300">
                                    Delete
                                  </Button>
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </ProtectedRoute>
  );
};

const ContactForm = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    name: initialData ? initialData.name : "",
    email: initialData ? initialData.email : "",
    phone: initialData ? initialData.phone : "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
    setFormData({
      name: "",
      email: "",
      phone: "",
    });
  };

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        email: initialData.email,
        phone: initialData.phone,
      });
    }
  }, [initialData]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-200">
          Name
        </label>
        <Input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          autoComplete="off"
          required
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-200">
          Email
        </label>
        <Input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          autoComplete="off"
          required
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-slate-300">
          Phone
        </label>
        <Input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          autoComplete="off"
          required
        />
      </div>
      <Button type="submit">Save</Button>
    </form>
  );
};

export default ContactsManagement;
