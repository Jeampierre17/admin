import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Actualiza el estado para mostrar el error alternativo UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Puedes registrar el error con un servicio de seguimiento de errores
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Puedes renderizar cualquier interfaz de usuario alternativa aquí.
      return <h1>Oops! Algo salió mal.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;