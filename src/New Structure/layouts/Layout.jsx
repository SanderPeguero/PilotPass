import Loader from '../utils/Loader';
import Sidebar from "../utils/Sidebar";
import { useContextPilotPass } from '../contexts/Context';

const Layout = (props) => {
  const { authToken, isLoading } = useContextPilotPass();

  if (isLoading) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
            <Loader />
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 font-sans text-gray-100 flex flex-col md:flex-row">
      <Sidebar isAuthenticated={authToken} />
      
      <main className={`flex-1 w-full relative transition-all duration-300 ${authToken ? 'md:ml-64' : ''}`}>
        {props.children}
      </main>
    </div>
  );
};

export default Layout;
