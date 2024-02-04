import { RecoilRoot } from "recoil";
import Routes from "./Routes";
import Layout from "./components/layout/Layout";

const App = () => {
  return (
    <RecoilRoot>
      <Layout>
        <Routes />
      </Layout>
    </RecoilRoot>
  );
};

export default App;
