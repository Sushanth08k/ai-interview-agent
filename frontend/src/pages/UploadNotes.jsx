import { useState } from "react";
import api from "../services/api";

export default function UploadNotes() {

    const [file, setFile] =
        useState(null);

    const [message, setMessage] =
        useState("");

    const handleUpload = async () => {

        if (!file) {

            alert(
                "Please select a PDF"
            );

            return;
        }

        const formData =
            new FormData();

        formData.append(
            "file",
            file
        );

        try {

            const res =
                await api.post(
                    "/notes/upload",
                    formData,
                    {
                        headers: {
                            "Content-Type":
                            "multipart/form-data"
                        }
                    }
                );

            setMessage(
                res.data.message
            );

        } catch (error) {

            console.log(error);

            alert(
                "Upload Failed"
            );
        }
    };

    return (

        <div>

            <h1>
                Upload Notes
            </h1>

            <input
                type="file"
                accept=".pdf"
                onChange={(e) =>
                    setFile(
                        e.target.files[0]
                    )
                }
            />

            <br />
            <br />

            <button
                onClick={handleUpload}
            >
                Upload PDF
            </button>

            <br />
            <br />

            <p>
                {message}
            </p>

        </div>

    );
}