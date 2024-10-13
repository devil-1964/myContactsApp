import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Github } from "lucide-react";
import axios from 'axios';

const AboutMe = () => {
    const [userData, setUserData] = useState(null);
    const [repos, setRepos] = useState([]);
    const githubUsername = import.meta.env.VITE_GITHUB_USERNAME; 

    useEffect(() => {
        const fetchGithubData = async () => {
            try {
                const userResponse = await axios.get(`https://api.github.com/users/${githubUsername}`);
                console.log(userResponse.data)
                setUserData(userResponse.data);

                const reposResponse = await axios.get(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=6`);
                console.log(reposResponse.data)
                setRepos(reposResponse.data);
            } catch (error) {
                console.error('Error fetching GitHub data:', error);
            }
        };

        fetchGithubData();
    }, []);

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <section className="min-h-screen bg-gradient-to-b from-[#0A0A0A] to-zinc-900 text-white relative">
            <div
                className="absolute inset-0 bg-cover bg-center opacity-15 z-0"
                style={{
                    backgroundImage: 'url("/bg.png")',
                }}
            ></div>
            <div className=" relative z-10 px-4 py-16 md:px-16 lg:px-24 ">
                <div className="max-w-4xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center mb-12">
                        <img
                            src={userData.avatar_url}
                            alt={userData.name}
                            className="w-48 h-48 rounded-full mb-6 md:mb-0 md:mr-8"
                        />
                        <div>
                            <h1 className="text-4xl md:text-6xl font-bold mb-4">{userData.name}</h1>
                            <p className="text-xl mb-4">{userData.bio}</p>
                            <div className="flex space-x-4">
                                <a href={userData.html_url} target="_blank" rel="noopener noreferrer">

                                    <Button as="a">
                                        <Github className="mr-2" /> GitHub Profile
                                    </Button>
                                </a>
                                <a href="https://devanshportfolio-devil-1964s-projects.vercel.app/" target="_blank" rel="noopener noreferrer">

                                    <Button as="a" variant="outline" className="p-5">
                                        Personal Website <ArrowRight className="ml-2" />
                                    </Button>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold mb-6">Latest Repositories</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {repos.map(repo => (
                                <div key={repo.id} className="bg-zinc-800 p-6 rounded-lg">
                                    <h3 className="text-xl font-semibold mb-2">{repo.name}</h3>
                                    <p className="text-gray-300 mb-4">{repo.description}</p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-400">
                                            {new Date(repo.updated_at).toLocaleDateString()}
                                        </span>
                                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer" >

                                            <Button as="a" size="sm">
                                                View Repo
                                            </Button>
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutMe;