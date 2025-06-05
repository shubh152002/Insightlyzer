import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMsg: "" };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, errorMsg: error.message };
  }

  componentDidCatch(error, info) {
    console.error("🛑 Chart render error caught by ErrorBoundary:", error);
    console.info("Component stack:", info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 bg-red-100 text-red-700 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Chart Render Failed</h2>
          <p>{this.state.errorMsg}</p>
          <p className="text-sm text-gray-600 mt-2">
            Try reloading the chart or selecting different values.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
