//styles
import classes from '../styles/Layout.module.css'; // Import the CSS module for layout styles

//components
import Loader from '../utils/Loader'; // Import the Loader component for loading state
import Sidebar from "../utils/Sidebar"; // Import the Sidebar component for navigation

//contexts
import { useContextPilotPass } from '../contexts/Context'; // Import the context hook for accessing authentication and loading state

const Layout = (props) => {
  // Destructure authToken and isLoading values from the context
  const { authToken, isLoading } = useContextPilotPass();

  // If the app is in a loading state, show the Loader component
  if (isLoading) {
    return <Loader />; // This displays the loading spinner while data is being fetched or processed
  }

  // If not loading, render the main layout
  return (
    <div className={classes.Layout}> {/* Main layout container */}
      {/* Sidebar will only be visible if the user is authenticated */}
      <Sidebar isAuthenticated={authToken} />
      
      {/* Main content area, with a top margin of 4rem */}
      <main style={{ marginTop: '4rem' }}>
        {/* Render children passed to the Layout component */}
        {props.children}
      </main>
    </div>
  );
};

export default Layout;

