import { useLogin } from "@refinedev/core";
import { useEffect, useRef } from "react";

import { Box, Container, Typography } from "@mui/material";
import { ThemedTitleV2 } from "@refinedev/mui";

import { yariga } from "../assets";

import { CredentialResponse } from "../interfaces/google";

export const Login: React.FC = () => {
  const { mutate: login } = useLogin<CredentialResponse>();

  const GoogleButton = (): JSX.Element => {
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (typeof window === 'undefined' || !window.google || !divRef.current) {
        return;
      }

      try {
        window.google.accounts.id.initialize({
          ux_mode: 'popup',
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          callback: async (res: CredentialResponse) => {
            if (res.credential) {
              login(res);
            }
          },
        });
        window.google.accounts.id.renderButton(divRef.current, {
          theme: 'filled_blue',
          size: 'medium',
          type: 'standard',
        });
      } catch (error) {
        console.log(error);
      }
    }, []);

    return <div ref={divRef} />;
  };

  return (
    <Box component="div" sx={{ backgroundColor: '#FCFCFC' }}>
      <Container
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          display="flex"
          gap="36px"
          justifyContent="center"
          flexDirection="column"
        >
          {/* <ThemedTitleV2
            collapsed={false}
            wrapperStyles={{
              fontSize: '22px',
              justifyContent: 'center',
            }}
          /> */}
          <Typography align="center" color={'text.secondary'} fontSize="12px">
            Powered by
            <img style={{ padding: '0 5px' }} alt="Google" src={yariga} />
            Google
          </Typography>

          <GoogleButton />
        </Box>
      </Container>
    </Box>
  );
};
