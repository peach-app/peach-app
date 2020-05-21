import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { BackHandler } from 'react-native';
import { WebView } from 'react-native-webview';
import { Header, Main, Icon } from './styles';

const WebViewComponent = ({ source, onClose }) => {
  const [canGoBack, setCanGoBack] = useState(false);
  const webView = useRef(null);
  const handleBackButton = () => {
    if (canGoBack) {
      webView.current.goBack();
      return true;
    }
    return false;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
  }, []);

  return (
    <>
      <Header canGoBack={canGoBack}>
        {canGoBack && (
          <Main onPress={handleBackButton}>
            <Icon name="ios-arrow-back" size={30} />
          </Main>
        )}

        <Main onPress={onClose}>
          <Icon name="ios-close" size={40} />
        </Main>
      </Header>
      <WebView
        source={{ uri: source }}
        ref={webView}
        injectedJavaScript={`
        (function() {
          function wrap(fn) {
            return function wrapper() {
              var res = fn.apply(this, arguments);
              window.ReactNativeWebView.postMessage('navigationStateChange');
              return res;
            }
          }
  
          history.pushState = wrap(history.pushState);
          history.replaceState = wrap(history.replaceState);
          window.addEventListener('popstate', function() {
            window.ReactNativeWebView.postMessage('navigationStateChange');
          });
        })();
  
        true;
      `}
        onMessage={({ nativeEvent: state }) => {
          if (state.data === 'navigationStateChange') {
            setCanGoBack(state.canGoBack);
          }
        }}
      />
    </>
  );
};

WebViewComponent.propTypes = {
  source: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
export default WebViewComponent;
