import AuthProvider from './AuthProvider';
import CountriesProvider from './CountriesProvider';

const AppProvider = props => {
  return (
    <AuthProvider>
      <CountriesProvider>{props.children}</CountriesProvider>
    </AuthProvider>
  );
};

export default AppProvider;
