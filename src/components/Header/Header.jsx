import BtnLink from "../Btn/Btn";

import "./Header.css";

const Header = () => {
  return (
    <div
      className="w-100  header-container relative"
      style={{ marginTop: "4.3rem" }}
    >
      <div className="overlay"></div>
      <video
        onLoadedMetadata={"this.muted= true"}
        autoPlay
        loop
        className="video"
      >
        <source
          src="./video/istockphoto-1227517584-640_adpp_is.mp4"
          type="video/mp4"
        />
      </video>
      <div className="  absolute">
        <BtnLink
          name={"Agregar usuario"}
          styles={"btn mr-3 link-btn"}
          link={"/add-users"}
        />
        <BtnLink
          name={"Ver Lista de Usuarios"}
          styles={"btn ml-3 link-btn"}
          link={"/users"}
        />
      </div>
    </div>
  );
};

export default Header;
