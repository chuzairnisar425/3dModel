import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

const PhoneCaseModel = ({ texture }) => {
    const { scene, materials } = useGLTF("/iPhone16.glb");

    useEffect(() => {
        if (texture) {
            texture.flipY = false;
            Object.values(materials).forEach((material) => {
                material.map = texture;
                material.needsUpdate = true;
            });
        }
    }, [texture, materials]);

    return <primitive object={scene} scale={[0.5, 0.5, 0.5]} />;
};

const PhoneCase = () => {
    const [texture, setTexture] = useState(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.src = e.target.result;
                img.onload = () => {
                    const newTexture = new THREE.Texture(img);
                    newTexture.needsUpdate = true;
                    setTexture(newTexture);
                };
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <>

            <section className="w-full bg-gradient-to-r from-green-500 to-green-400 text-white py-28">
                <div className="flex flex-col items-center justify-center text-center px-6">
                    <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
                        Create Your Personalized Phone Case Today!
                    </h1>
                    <p className="mt-4 text-xl sm:text-2xl font-light max-w-2xl mx-auto">
                        Stand out with a custom design that reflects your unique style. Upload your favorite image, and let us bring your vision to life on a premium phone case. Design it your way!
                    </p>

                </div>
            </section>



            <div className="flex flex-col md:flex-row items-center justify-center p-8 ">
                <div className="w-full md:w-1/3   p-6 shadow-lg rounded-lg flex flex-col items-center justify-center text-center " style={{ height: '80vh' }}>
                    <p className="text-grey-600 font-bold mt-2">
                        Upload an image to apply it to your phone case. Use the zoom controls to closely inspect your design. Zoom in for detailed views or zoom out to see the full phone case design.
                    </p>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="mt-4 p-2 w-full border rounded-md cursor-pointer text-grey-600"
                    />
                </div>

                <div className="w-full md:w-2/3 flex justify-center items-center p-6" style={{ height: '90vh' }}>
                    <Canvas
                        camera={{ position: [0, 0, 5] }} // Move the camera closer for a larger view
                        className="w-full h-full rounded-lg shadow-lg bg-yellow-100"
                    >
                        <ambientLight intensity={1} /> {/* Increase brightness */}
                        <directionalLight position={[3, 3, 3]} />
                        <group scale={[3, 3, 3]}>  {/* Increase size of the phone case */}
                            <PhoneCaseModel texture={texture} />
                        </group>
                        <OrbitControls enableZoom={true} /> {/* Allow zooming */}
                    </Canvas>
                </div>
            </div>
        </>

    );
};

export default PhoneCase;
