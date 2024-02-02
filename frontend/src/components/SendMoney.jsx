import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { BottomWarning } from "./BottomWarning";




export const SendMoney = () => {

    const [text, setText] = useState([])
    
    const isAuthenticated = !!localStorage.getItem('token');
    

    const navigate = useNavigate();
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/signup');
        }

    }, [navigate, isAuthenticated])



    const [searchParams] = useSearchParams()
    let name = searchParams.get("name");
    let id = searchParams.get("id");
    const [amount, setAmount] = useState(0)
    const firstLetter = name.charAt(0).toUpperCase();
    return <div className="flex justify-center h-screen bg-gray-100">
        <div className="h-full flex flex-col justify-center">
            <div
                className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg"
            >
                <div className="flex flex-col space-y-1.5 p-6">
                    <h2 className="text-3xl font-bold text-center">Send Money</h2>
                </div>
                <div className="p-6">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                            <span className="text-2xl text-white">{firstLetter}</span>
                        </div>
                        <h3 className="text-2xl font-semibold">{name}</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                for="amount"
                            >
                                
                                Amount (in Rs)
                            </label>
                            <input
                                onChange={(e) => {
                                    setAmount(e.target.value)
                                }}
                                type="number"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                id="amount"
                                placeholder="Enter amount"
                            />
                        </div>
                        <button onClick={(e) => {
                            e.preventDefault()
                            axios.post("http://localhost:3000/api/v1/account/transfer", {
                                to: id,
                                amount
                            }, {
                                headers: {
                                    Authorization: "Bearer " + localStorage.getItem("token")
                                }
                            }).then((response) => {
                                setText(response.data.message)
                                
                                
                                console.log(response.data.message);
                                // Optionally, you can navigate to a success page or perform other actions.
                              })
                              .catch((error) => {
                                
                                if (error.response) {
                                    // The request was made and the server responded with a status code
                                    // other than 2xx. Access the error response data and set the message.
                                    setText(error.response.data.message);

                                    console.log(error.response.data.message);
                                } else if (error.request) {
                                    // The request was made but no response was received.
                                    console.error("No response received:", error.request);
                                } else {
                                    // Something happened in setting up the request that triggered an Error.
                                    console.error("Error setting up the request:", error.message);
                                }
                                // Optionally, you can show an error message to the user.
                              });
                        }} className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white">
                            Initiate Transfer
                        </button>
                        <h1>{text}</h1>
                        <BottomWarning label={""} buttonText={"Go To Dashboard"} to={"/dashboard"}/>
                    </div>
                </div>
            </div>
        </div>
    </div>
}