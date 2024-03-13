import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../utils/app-logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginApi } from "../Api/apis";
import SetCookie from "../cookiesAndLocalStroage/SetCookie";
import GetCookie from "../cookiesAndLocalStroage/GetCookie";
import SetToLocalStroage from "../cookiesAndLocalStroage/SetToLS";

const initialState = {
  username: "",
  password: "",
};

export default function Login() {
  const [FormData, setFormData] = useState(initialState);
  const navigate = useNavigate();
  const ToastOptions = {
    position: "top-right",
    autoClose: 5000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    let user = GetCookie("apex-chatter-app");
    if (user) {
      navigate("/");
    }
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { username, password } = FormData;
      try {
        const { data } = await axios.post(`${loginApi}`, {
          username,
          password,
        });

        if (data.status === false) {
          toast.error(data.msg, ToastOptions);
        }
        if (data.status === true) {
          SetToLocalStroage("apex-chatter-user-avatar", data.user.avatarImg);
          delete data.user.avatarImg;
          SetCookie("apex-chatter-app", JSON.stringify(data.user));
          toast.success(data.msg, ToastOptions);
          navigate("/");
        }
      } catch (error) {
        const msg = error.response.data.msg;
        toast.error(msg, ToastOptions);
      }
    }
  };

  const handleValidation = () => {
    const { username, password } = FormData;
    if (password === "") {
      toast.error("Email and password is required", ToastOptions);
      return false;
    } else if (username.length === "") {
      toast.error("Email and password is required", ToastOptions);
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <Container>
        <Wrapper>
          <SideContent>
            <LogoHeading>ChatApp</LogoHeading>
            <Image src={Logo} alt={"error"} />
          </SideContent>
          <Form onSubmit={(e) => handleFormSubmit(e)}>
            <Header>
              <LogoHeading>ChatApp</LogoHeading>
              <Image2 src={Logo} alt={"error"} />
            </Header>
            <FormHeading>Login</FormHeading>
            <Input
              type="text"
              placeholder="Username or email"
              name="username"
              onChange={(e) => handleChange(e)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => handleChange(e)}
              required
            />
            <NewUser>
              Don't have an account?{" "}
              <Link to={"/register"} className="link">
                Register
              </Link>
            </NewUser>
            <SubmitButton type="submit">Login</SubmitButton>
          </Form>
        </Wrapper>
      </Container>
      <ToastContainer />
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 800px;
  background-color: #2e2e38;
  display: flex;
  gap: 20px;
  padding: 50px;
  border-radius: 10px;
  margin: 30px;
  animation: fadeIn 1.5s forwards;
  transition-timing-function: cubic-bezier(0.785, 0.135, 0.15, 0.86);

  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: scale(1);
    }
    50% {
      opacity: 1;
      transform: scale(1.1);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  @media (max-width: 800px) {
    padding: 30px;
  }

  @media (max-width: 765px) {
    width: 400px;
  }

  @media (max-width: 400px) {
    margin: 10px;
    padding: 20px;
  }
`;

const SideContent = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 765px) {
    display: none;
  }
`;

const LogoHeading = styled.div`
  color: #8c52fe;
  font-size: larger;
  margin-bottom: 10px;
  font-weight: bolder;
  animation: fadeIn 1.5s forwards;
  transition-timing-function: cubic-bezier(0.785, 0.135, 0.15, 0.86);

  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: scale(1);
    }
    50% {
      opacity: 1;
      transform: scale(1.1);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const Image = styled.img`
  width: 250px;
  animation: fadeIn 1.5s forwards;
  transition-timing-function: cubic-bezier(0.785, 0.135, 0.15, 0.86);

  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: scale(1);
    }
    50% {
      opacity: 1;
      transform: scale(1.1);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  @media (max-width: 800px) {
    width: 220px;
  }
`;

const Form = styled.form`
  width: 50%;
  display: flex;
  flex-direction: column;
  animation: fadeIn 1.5s forwards;
  transition-timing-function: cubic-bezier(0.785, 0.135, 0.15, 0.86);

  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: scale(1);
    }
    50% {
      opacity: 1;
      transform: scale(1.1);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
  @media (max-width: 765px) {
    width: 100%;
  }
`;

const Header = styled.div`
  display: none;

  @media (max-width: 765px) {
    display: block;
  }
`;

const Image2 = styled.img`
  width: 50px;
  margin: auto;
  animation: fadeIn 1.5s forwards;
  transition-timing-function: cubic-bezier(0.785, 0.135, 0.15, 0.86);

  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: scale(1);
    }
    50% {
      opacity: 1;
      transform: scale(1.1);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const FormHeading = styled.div`
  color: #2db285;
  font-size: 30px;
  margin-bottom: 40px;
  font-weight: bolder;
  border-top: solid #2db285 0.5px;
  border-bottom: solid #2db285 0.5px;
  border-radius: 10px;
  padding: 5px;

  @media (max-width: 330px) {
    font-size: 20px;
  }
`;

const Input = styled.input`
  display: block;
  height: 35px;
  padding-left: 10px;
  border-radius: 5px;
  margin: 5px 0px;
  font-size: 15px;
  border: none;
  margin-bottom: 20px;
`;

const SubmitButton = styled.button`
  height: 40px;
  border-radius: 5px;
  margin-top: 20px;
  background-color: #8c52fe;
  border: none;
  font-size: larger;
  color: white;
  font-weight: 900;

  &&:hover {
    background-color: white;
    color: black;
    transition: background-color, color, 0.5s ease-in-out;
  }
`;

const NewUser = styled.span`
  color: white;
  margin-top: 20px;

  .link {
    color: #2db285;
  }
`;
