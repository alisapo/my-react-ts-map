interface PopupContent {
  backgroundColor: string;
  borderRadius: string;
  padding: string;
};

interface PopupHead {
  fontSize: string;
};

interface PopupText {
  fontSize: string;
};

const popupContent: PopupContent = {
  backgroundColor: "#b1cbec",
  borderRadius: "3px",
  padding: "3px",
};

const popupHead: PopupHead = {
  fontSize: "17px",
};

const popupText: PopupText = {
  fontSize: "15px",
};

export { popupContent, popupText, popupHead };
