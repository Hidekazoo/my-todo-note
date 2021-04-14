import React, { useEffect } from "react";
import { OverlayProvider, OverlayContainer } from "@react-aria/overlays";
import { ModalDialog } from "./ModalDialog";
import { authInstance } from "../api/instance";
import { useAuth0 } from "@auth0/auth0-react";

export const RequestWrapper = (Wrapped: any) => {
  function RequestSetting(props: any) {
    const { getAccessTokenSilently, isAuthenticated } = useAuth0();
    const [error, setError] = React.useState(false);
    const [errorMsg, setErrorMsg] = React.useState("");

    useEffect(() => {
      const setAccessToken = async () => {
        try {
          const token = await getAccessTokenSilently();
          authInstance.interceptors.request.use(
            (config) => {
              if (!token) {
                throw new Error("ログイン情報の取得に失敗しました");
              }
              config.headers.Authorization = `Bearer ${token}`;
              return config;
            },
            (error) => {
              return Promise.reject(error);
            }
          );
        } catch (err) {
          setError(true);
          setErrorMsg("ログイン情報の取得に失敗しました。");
        }
      };
      if (isAuthenticated) {
        setAccessToken();
      }
    }, [getAccessTokenSilently, isAuthenticated]);

    useEffect(() => {
      authInstance.interceptors.response.use(
        function (response: any) {
          return response;
        },
        function (error) {
          if (error.config && !error.config.commonErrorHandling) {
            setError(true);
            if (!error.response) {
              setErrorMsg("インターネット接続の確認をお願いします。");
              return Promise.reject(error);
            }
            switch (error.response.status) {
              case 401:
                setErrorMsg("表示権限がありません。");
                break;
              default:
                break;
            }
          }
          return Promise.reject(error);
        }
      );
    }, [props.history]);

    const resetErrorState = () => {
      setErrorMsg("");
      setError(false);
    };

    return (
      <React.Fragment>
        <Wrapped {...props} />
        {error && (
          <React.Fragment>
            <OverlayProvider>
              <OverlayContainer>
                <ModalDialog
                  title="&#x1F62B;エラーです"
                  isOpen
                  onClose={resetErrorState}
                  isDismissable
                >
                  {errorMsg}
                </ModalDialog>
              </OverlayContainer>
            </OverlayProvider>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
  return RequestSetting;
};
