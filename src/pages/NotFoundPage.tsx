import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MoveLeft, AlertCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function NotFound() {
    return (
        <>
            {/* page title */}
        <Helmet>
            <title>404 Not Found - Card Info and Transaction Tracker</title>
        </Helmet>

        <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gradient-to-b from-gray-50 to-gray-100 px-4">
            <div className="space-y-6 max-w-md">
            <AlertCircle className="w-24 h-24 text-blue-600 mx-auto animate-pulse" />
            
            <h1 className="text-6xl font-extrabold text-gray-900">
                4<span className="text-blue-600">0</span>4
            </h1>
            <p className="text-xl text-gray-600">
                Oops! The page you're looking for has gone on a cosmic adventure.
            </p>

            {/* Back to the home page */}
            <Link to="/">
                <Button className="mt-4 animate-pulse">
                <MoveLeft className="mr-2 h-4 w-4" /> Return to Home Base
                </Button>
            </Link>
            </div>
        </div>
        </>
    );
}

