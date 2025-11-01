import React from 'react';
import { TicketData, TemplateId } from '../../types';

import ClassicTemplate from './ClassicTemplate';
import GridTemplate from './GridTemplate';
import ModernTemplate from './ModernTemplate';
import OfficialTemplate from './OfficialTemplate';
import OfficialTemplate2 from './OfficialTemplate2';
import OfficialTemplate3 from './OfficialTemplate3';
import PrimaryTemplate1 from './PrimaryTemplate1';
import PrimaryTemplate2 from './PrimaryTemplate2';

interface TemplateWrapperProps {
  data: TicketData;
  templateId: TemplateId;
}

const TemplateComponents = {
  [TemplateId.Classic]: ClassicTemplate,
  [TemplateId.Modern]: ModernTemplate,
  [TemplateId.Grid]: GridTemplate,
  [TemplateId.Official]: OfficialTemplate,
  [TemplateId.Official2]: OfficialTemplate2,
  [TemplateId.Official3]: OfficialTemplate3,
  [TemplateId.Primary1]: PrimaryTemplate1,
  [TemplateId.Primary2]: PrimaryTemplate2,
};

// Error Boundary Component
interface TemplateErrorBoundaryProps {
  children: React.ReactNode;
}

interface TemplateErrorBoundaryState {
  hasError: boolean;
}

// FIX: The class must extend React.Component to be a valid React component and have access to `props` and `setState`.
class TemplateErrorBoundary extends React.Component<TemplateErrorBoundaryProps, TemplateErrorBoundaryState> {
  state: TemplateErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(error: Error): TemplateErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error("Template rendering error:", error, errorInfo);
  }
  
  componentDidUpdate(prevProps: TemplateErrorBoundaryProps) {
    // FIX: Add check for props existence and access children property
    if (this.props.children !== prevProps.children) {
      // FIX: Use this.setState to update state
      this.setState({ hasError: false });
    }
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">خطأ!</strong>
          <span className="block sm:inline"> حدث خطأ أثناء عرض المعاينة.</span>
        </div>
      );
    }

    // FIX: Access children from props
    return this.props.children;
  }
}


const TemplateWrapper: React.FC<TemplateWrapperProps> = ({ data, templateId }) => {
  const TemplateComponent = TemplateComponents[templateId] || OfficialTemplate3;

  // Use a key to force re-mounting the boundary when data changes, if needed
  const key = `${templateId}-${data.id}`;

  return (
    <TemplateErrorBoundary key={key}>
      <TemplateComponent data={data} />
    </TemplateErrorBoundary>
  );
};

export default TemplateWrapper;