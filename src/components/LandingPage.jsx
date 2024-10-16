import React from "react";
import '../styles/LandingPage.css'
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
    const navigate = useNavigate()
    return (
        <div className="landing-page">
            <header className="header">
                <img src="https://files.oaiusercontent.com/file-FeZlB9wz0imMdAQBGeq3OqRh?se=2024-10-11T00%3A56%3A25Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D1cddb43b-f327-4be2-95ae-39ebc295d051.webp&sig=PMt34H0EnOyuVrW3cwJoqMaRYe5FEaBiGnBuvx0mq4s%3D" alt="Logo" className="logo" />
                <h1>STARR's Creations</h1>
            </header>

            <nav className="nav">
                <ul>
                    <li onClick={() => navigate('/ProductList')}>Products</li>
                    <li onClick={() => navigate('/ProductList?category=Pastrey')}>Pastries</li>
                    <li onClick={() => navigate('/ProductList?category=Cake')}>Cakes</li>
                </ul>
            </nav>

            <main className="main-content">
                <div className="random-img-container">
                    <img src="RANDOM_IMAGE_URI" alt="Random" className="random-img" />
                </div>

                <div className="info-section">
                    <h2>Welcome to STARR's Bakery!</h2>
                    <p>
                        As a passionate culinary student navigating the vibrant world of baking, I’m excited to share my journey with you. My dream is to blend creativity and flavor, crafting delightful pastries that not only satisfy the palate but also tell a story.
                    </p>
                    <p>
                        At STARR's Bakery, every treat is a reflection of my culinary education, where I experiment with techniques and ingredients learned in school. From classic recipes to innovative creations, each product is made with love and dedication, aiming to bring joy to every customer.
                    </p>
                    <p>
                        Join me on this delicious adventure, where quality ingredients meet artistic expression, and together we can celebrate the sweetness of life, one pastry at a time!
                    </p>
                </div>
            </main>
        </div>
    )
}


export default LandingPage