import { Authenticator } from "./screens/Authenticator";
import { Home } from "./pages/Home";
import { AmplifyV6 as Amplify } from "aws-amplify";

Amplify.configure({
  Auth: {
    userPoolId: "us-east-1_XHEu73dGC",
    userPoolWebClientId: "5nu3deigqhvajo0faq2u15frs1",
    identityPoolId: "us-east-1:27cc9d31-91f1-4d90-a787-50ce57fb89a5",
  },
});

function App() {
  return (
    <div
      className="App"
      style={{ display: "flex", justifyContent: "center", padding: "1rem" }}
    >
      <Authenticator>
        <Home />
      </Authenticator>
    </div>
  );
}

export default App;
