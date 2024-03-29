import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import domtoimage, { Options } from "dom-to-image";
import Editor from "../components/Editor";
import ModalComp from "../components/modal";
import { Switch } from "@chakra-ui/switch";
import { createRef, MouseEvent, useEffect, useState } from "react";
import { BiExport } from "react-icons/bi";
import { DiCss3, DiHtml5, DiJavascript, DiReact } from "react-icons/di";
import { BiChevronDown } from "react-icons/bi";
import { IoLogoPython } from "react-icons/io";

const HomePage = (): JSX.Element => {
  const [paddingOptions, setPaddingOptions] = useState<string>("");
  const [lang, setLang] = useState<string>("");
  const [themes, setThemes] = useState<string>("");
  const [isDark, setIsDark] = useState<any>(true);
  const [isTransparent, setIsTransparent] = useState<any>(false);
  const [bg, setBg] = useState<string>(``);
  const [src, setSrc] = useState<string>("");
  const boxRef = createRef<HTMLDivElement>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    switch (themes) {
      case "beige":
        setBg(`bg-gradient-to-br from-themes-beigeFrom to-themes-beigeTo`);
        break;
      case "purple":
        setBg(`bg-gradient-to-tr from-themes-purpleFrom to-themes-purpleTo`);
        break;
      case "green":
        setBg(`bg-gradient-to-br from-themes-greenFrom to-themes-greenTo`);
        break;
      case "blue":
        setBg(`bg-gradient-to-br from-themes-blueFrom to-themes-blueTo`);
        break;
      default:
        setBg(`bg-gradient-to-br from-themes-beigeFrom to-themes-beigeTo`);
        break;
    }
  }, [themes]);

  const controls = [
    { color: "bg-controls-red", id: 1 },
    { color: "bg-controls-yellow", id: 2 },
    { color: "bg-controls-green", id: 3 },
  ];

  const handlePadding = (e: MouseEvent<HTMLElement>) => {
    const { name } = e.target as HTMLButtonElement;
    setPaddingOptions(name);
  };

  const handleLang = (e: MouseEvent<HTMLElement>) => {
    const { name } = e.target as HTMLButtonElement;
    setLang(name);
  };

  const handleTheme = (e: MouseEvent<HTMLElement>) => {
    const { name } = e.target as HTMLButtonElement;
    setThemes(name);
  };

  const handleExport = (node: HTMLElement | any) => {
    console.log(node);
    let scale = 2;
    domtoimage
      .toPng(node, {
        width: node.clientWidth * scale,
        height: node.clientHeight * scale,
        style: {
          transform: "scale(" + scale + ")",
          transformOrigin: "top left",
          borderRadius: "0px"
        },
      })
      .then((dataUrl) => {
        let img = new Image();
        img.src = dataUrl;
        setSrc(img.src);
      })
      .catch(function (err) {
        console.error("oops, something went wrong!", err);
      });
  };

  return (
    <div className="container ">
      <div
        ref={isTransparent ? null : boxRef}
        className={` max-w-7xl  min-h-96 h-auto mb-14  w-screen  sm:w-auto rounded-xl ${
          paddingOptions ? paddingOptions : "p-7"
        } ${isTransparent ? "transparentBg" : bg}`}
      >
        <div ref={isTransparent ? boxRef : null}>
          <div
            className={`${
              isDark ? "bg-secondary-code" : "bg-secondary-light"
            }  rounded-xl  overflow-hidden  `}
          >
            <div className="w-full h-8 mb-4 rounded-t-xl flex justify-between items-end  pl-4  pr-4 ">
              <div className="flex w-auto ">
                {controls.map((item) => (
                  <span
                    key={item.id}
                    className={`w-4 h-4 rounded-full mr-3 block ${item.color}`}
                  ></span>
                ))}
              </div>
              <input
                type="text"
                placeholder="untitled-1"
                className="input-title"
              />
              <div className="w-20"></div>
            </div>

            <Editor lang={lang} isDark={isDark} />
          </div>
        </div>
      </div>

      <div className="mx-auto min-w-9/12 w-screen sm:w-auto flex-wrap h-auto py-3 border-2 border-primary-200  rounded-xl flex justify-between items-center pl-3 pr-3 capitalize ">
        <div className="flex items-center flex-wrap  ">
          <div className="flex items-center mr-3 cursor-pointer">
            <Menu>
              <MenuButton
                as={Button}
                bg="none"
                _focus={{}}
                _hover={{}}
                _active={{}}
              >
                <Flex flexDir="row-reverse">
                  <div className={`w-5 h-5 ${bg} rounded-full`}></div>
                  <h1 className="text-primary-400 mr-3 font-medium">
                    background
                  </h1>
                </Flex>
              </MenuButton>
              <MenuList bg="#fde8be" border="1px solid #F6C76E">
                <MenuItem
                  _hover={{ bg: "#F6C76E" }}
                  _focus={{}}
                  name="beige"
                  onClick={handleTheme}
                  icon={
                    <div
                      className={`w-5 h-5 bg-gradient-to-br from-themes-beigeFrom to-themes-beigeTo rounded-full`}
                    ></div>
                  }
                >
                  Beige
                </MenuItem>
                <MenuItem
                  _hover={{ bg: "#F6C76E" }}
                  _focus={{}}
                  name="purple"
                  onClick={handleTheme}
                  icon={
                    <div
                      className={`w-5 h-5 bg-gradient-to-br from-themes-purpleFrom to-themes-purpleTo rounded-full`}
                    ></div>
                  }
                >
                  purple
                </MenuItem>
                <MenuItem
                  _hover={{ bg: "#F6C76E" }}
                  _focus={{}}
                  name="green"
                  onClick={handleTheme}
                  icon={
                    <div
                      className={`w-5 h-5 bg-gradient-to-br from-themes-greenFrom to-themes-greenTo rounded-full`}
                    ></div>
                  }
                >
                  green
                </MenuItem>
                <MenuItem
                  _hover={{ bg: "#F6C76E" }}
                  _focus={{}}
                  name="blue"
                  onClick={handleTheme}
                  icon={
                    <div
                      className={`w-5 h-5 bg-gradient-to-br from-themes-blueFrom to-themes-blueTo rounded-full`}
                    ></div>
                  }
                >
                  blue
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
          <div className="flex items-center mr-6 cursor-pointer">
            <label
              htmlFor="lightmode"
              className="text-primary-400 mr-3 font-medium cursor-pointer select-none"
            >
              light mode
            </label>
            <Switch
              colorScheme="orange"
              onChange={() => setIsDark((prev: any) => !prev)}
              id="lightmode"
              value={isDark}
            />
          </div>
          <div className="flex items-center mr-6 cursor-pointer">
            <label
              htmlFor="transparent"
              className="text-primary-400 mr-3 font-medium cursor-pointer select-none"
            >
              transparent
            </label>
            <Switch
              colorScheme="orange"
              value={isTransparent}
              id="transparent"
              onChange={() => setIsTransparent((prev: any) => !prev)}
            />
          </div>
          <div className="flex items-center  cursor-pointer ">
            <Menu>
              <MenuButton
                as={Button}
                _focus={{}}
                bg="none"
                _hover={{}}
                _active={{}}
              >
                <Flex alignItems="center">
                  <h1 className="text-primary-400 font-medium">padding</h1>
                  <BiChevronDown className="text-primary-400 ml-1 mt-1 text-xl" />
                </Flex>
              </MenuButton>
              <MenuList bg="#fde8be" border="1px solid #F6C76E">
                <MenuItem
                  _hover={{ bg: "#F6C76E" }}
                  _focus={{}}
                  name="p-5"
                  onClick={handlePadding}
                >
                  5
                </MenuItem>
                <MenuItem
                  _hover={{ bg: "#F6C76E" }}
                  _focus={{}}
                  name="p-7"
                  onClick={handlePadding}
                >
                  7
                </MenuItem>
                <MenuItem
                  _hover={{ bg: "#F6C76E" }}
                  _focus={{}}
                  name="p-10"
                  onClick={handlePadding}
                >
                  10
                </MenuItem>
                <MenuItem
                  _hover={{ bg: "#F6C76E" }}
                  _focus={{}}
                  name="p-16"
                  onClick={handlePadding}
                >
                  16
                </MenuItem>
                <MenuItem
                  _hover={{ bg: "#F6C76E" }}
                  _focus={{}}
                  name="p-20"
                  onClick={handlePadding}
                >
                  20
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
          <div className="flex items-center mr-6 cursor-pointer">
            <Menu>
              <MenuButton
                as={Button}
                _focus={{}}
                bg="none"
                _hover={{}}
                _active={{}}
              >
                <Flex alignItems="center">
                  <h1 className="text-primary-400 mr-1 font-medium">
                    language
                  </h1>
                  <BiChevronDown className="text-primary-400  mt-1 text-xl" />
                </Flex>
              </MenuButton>
              <MenuList bg="#fde8be" border="1px solid #F6C76E">
                <MenuItem
                  _hover={{ bg: "#F6C76E" }}
                  _focus={{}}
                  name="jsx"
                  onClick={handleLang}
                  color="#3E2013"
                  icon={
                    <DiReact style={{ fontSize: "25px" }} color="#3E2013" />
                  }
                >
                  JSX
                </MenuItem>
                <MenuItem
                  _hover={{ bg: "#F6C76E" }}
                  _focus={{}}
                  name="html"
                  onClick={handleLang}
                  color="#3E2013"
                  icon={
                    <DiHtml5 style={{ fontSize: "25px" }} color="#3E2013" />
                  }
                >
                  HTML
                </MenuItem>
                <MenuItem
                  _hover={{ bg: "#F6C76E" }}
                  _focus={{}}
                  name="css"
                  onClick={handleLang}
                  color="#3E2013"
                  icon={<DiCss3 style={{ fontSize: "25px" }} color="#3E2013" />}
                >
                  CSS
                </MenuItem>
                <MenuItem
                  _hover={{ bg: "#F6C76E" }}
                  _focus={{}}
                  name="javascript"
                  onClick={handleLang}
                  color="#3E2013"
                  icon={
                    <DiJavascript
                      style={{ fontSize: "25px" }}
                      color="#3E2013"
                    />
                  }
                >
                  JAVASCRIPT
                </MenuItem>

                <MenuItem
                  _hover={{ bg: "#F6C76E" }}
                  _focus={{}}
                  name="python"
                  onClick={handleLang}
                  color="#3E2013"
                  icon={
                    <IoLogoPython
                      style={{ fontSize: "25px" }}
                      color="#3E2013"
                    />
                  }
                >
                  PYTHON
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
        </div>

        <button
          className="bg-primary-200 px-4 py-1 hover:bg-primary-100 border-2 border-primary-200 transition-all active:bg-primary-200 font-medium text-primary-400 rounded-lg flex items-center"
          onClick={() => {
            handleExport(boxRef.current);
            onOpen();
          }}
        >
          Export
          <BiExport style={{ marginLeft: "10px", color: "#3E2013" }} />
        </button>
      </div>
      <ModalComp isOpen={isOpen} src={src} onClose={onClose} />
    </div>
  );
};

export default HomePage;
