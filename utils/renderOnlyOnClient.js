import { useState, useEffect } from "react";
function useIsClient() {
   const [isClient, setIsClient] = useState(false);
   // The following effect will be ignored on server,
   // but run on the browser to set the flag true
   useEffect(() => setIsClient(true), []);
   return isClient;
}
export function renderOnlyOnClient(TheComponent) {
   return function ClientOnlyComponent({ children, ...rest }) {
      const isClient = useIsClient(); // Yes, the hook is still useful!
      return isClient ? (
         <TheComponent {...rest}>{children}</TheComponent>
      ) : (
         <></>
      );
   };
}
