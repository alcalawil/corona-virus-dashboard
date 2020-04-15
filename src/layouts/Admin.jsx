import React, { useState, useEffect, useRef } from "react";
import { Route, Switch } from "react-router-dom";
import NotificationSystem from "react-notification-system";
import AdminNavbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/Sidebar";
import routes from "routes.js";
import { style } from "variables/Variables.jsx";
import image from "assets/img/sidebar-3.jpg";

const Admin = (props) => {
  const [notificationSystem, setNotificationSystem] = useState(null);
  const notificationRef = useRef(null);
  const mainPanelRef = useRef(null);

  useEffect(() => {
    setNotificationSystem(notificationRef);
    var _notificationSystem = notificationRef.current;
    const level = "info";
    _notificationSystem.addNotification({
      title: <span data-notify="icon" className="pe-7s-gift" />,
      message: getRandomMessage(),
      level: level,
      position: "tl",
      autoDismiss: 5,
    });
  }, []);

  const handleNotificationClick = (position) => {
    const level = "success";
    notificationSystem.addNotification({
      title: <span data-notify="icon" className="pe-7s-gift" />,
      message: getRandomMessage(),
      level: level,
      position: position,
      autoDismiss: 5,
    });
  };

  const getRandomMessage = () => {
    return (
      <div>
        <b>"Solo serán dos semanas de cuarentena"</b> Alberto Fernandez
      </div>
    );
  };

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      return (
        <Route
          path={prop.path}
          render={(props) => (
            <prop.component {...props} handleClick={handleNotificationClick} />
          )}
          key={key}
        />
      );
    });
  };

  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        props.location.pathname.indexOf(routes[i].layout + routes[i].path) !==
        -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  // const componentDidUpdate = (e) => {
  //   if (
  //     window.innerWidth < 993 &&
  //     e.history.location.pathname !== e.location.pathname &&
  //     document.documentElement.className.indexOf("nav-open") !== -1
  //   ) {
  //     document.documentElement.classList.toggle("nav-open");
  //   }
  //   if (e.history.action === "PUSH") {
  //     document.documentElement.scrollTop = 0;
  //     document.scrollingElement.scrollTop = 0;
  //     this.refs.mainPanel.scrollTop = 0;
  //   }
  // }

  return (
    <div className="wrapper">
      <NotificationSystem ref={notificationRef} style={style} />
      <Sidebar
        {...props}
        routes={routes}
        image={image}
        color="black"
        hasImage={true}
      />
      <div id="main-panel" className="main-panel" ref={mainPanelRef}>
        <AdminNavbar
          {...props}
          brandText={getBrandText(props.location.pathname)}
        />
        <Switch>{getRoutes(routes)}</Switch>
        <Footer />
      </div>
    </div>
  );
};

export default Admin;
