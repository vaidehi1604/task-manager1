import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
                    <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-8 text-center">
                        <h2 className="text-2xl font-bold text-red-600 mb-4">
                            Something went wrong
                        </h2>
                        <p className="text-gray-600 mb-6">
                            We encountered an unexpected error. Please try refreshing the page.
                        </p>
                        <p className="text-sm text-gray-400 mb-6 bg-gray-100 p-2 rounded overflow-auto">
                            {this.state.error?.toString()}
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-sky-900 text-white px-6 py-2 rounded-lg hover:bg-sky-800 transition"
                        >
                            Refresh Page
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
