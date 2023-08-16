import { useEffect, useState } from "react";
import "./App.css";
import Papa from "papaparse";
import FileSaver from "file-saver";

function App() {
  const [result, setResult] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [incorrect, setIncorrect] = useState(false);
  const [similar, setSimilar] = useState(false);
  const [match, setMatch] = useState(false);
  const [id, setId] = useState("0");
  const [completed, setCompleted] = useState(false);

  const [fileError, setFileError] = useState(null);
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    if (result.length > 0) {
      const matchedImg = result[id]["Match Image Link"];
      const incorrectValue = result[id]["Incorrect Image Format"];
      const similarValue = result[id]["Similar Match"];
      const matchValue = result[id]["No Match"];
      if (matchedImg !== undefined || matchedImg !== null) {
        setSelectedImage(matchedImg);
      }
      if (incorrectValue) {
        if (incorrectValue === "0") setIncorrect(false);
        else setIncorrect(true);
      } else {
        setIncorrect(false);
      }
      if (similarValue) {
        if (similarValue === "0") setSimilar(false);
        else setSimilar(true);
      } else {
        setSimilar(false);
      }
      if (matchValue) {
        if (matchValue === "0") setMatch(false);
        else setMatch(true);
      } else {
        setMatch(false);
      }
    }
  }, [id, result]);

  const handleFile = (e) => {
    if (e.target.files[0].type !== "text/csv") {
      return setFileError("Please select a csv file");
    }
    setFileError(null);
    setFileName(e.target.files[0].name);
    Papa.parse(e.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: (arr) => {
        setResult(arr.data);
        for (let i = 0; i < arr.data.length; i++) {
          const imageFormat = arr.data[i]["Incorrect Image Format"];
          const similarMatch = arr.data[i]["Similar Match"];
          const noMatch = arr.data[i]["No Match"];
          if (
            (imageFormat === "0" || imageFormat === "1") &&
            (similarMatch === "0" || similarMatch === "1") &&
            (noMatch === "0" || noMatch === "1")
          ) {
            console.log("edited");
            const newId = i + 1;
            setId(newId.toString());
          } else {
            break;
          }
        }
      },
    });
  };

  const handleClick = (value) => {
    setSelectedImage(value);
  };

  const handleDownload = () => {
    const csv = Papa.unparse(result);
    var file = new File([csv], `Edited--${fileName}`, {
      type: "text/csv;charset=utf-8",
    });
    FileSaver.saveAs(file);
  };

  const handleLeftClick = () => {
    const currentId = parseInt(id);
    const newId = currentId - 1;
    setId(newId.toString());
    if (completed === true) setCompleted(false);
    window.scroll(0, 0);
  };

  const handleRightClick = () => {
    const currentId = parseInt(id);
    const newId = currentId + 1;
    setId(newId.toString());
    window.scroll(0, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    result[id]["Match Image Link"] = selectedImage;
    if (incorrect === true) {
      result[id]["Incorrect Image Format"] = "1";
    } else {
      result[id]["Incorrect Image Format"] = "0";
    }
    if (similar === true) {
      result[id]["Similar Match"] = "1";
    } else {
      result[id]["Similar Match"] = "0";
    }
    if (match === true) {
      result[id]["No Match"] = "1";
    } else {
      result[id]["No Match"] = "0";
    }

    const currentId = parseInt(id);
    if (currentId === result.length - 1) {
      setCompleted(true);
    } else {
      const newId = currentId + 1;
      setId(newId.toString());
    }
    window.scroll(0, 0);
  };

  return (
    <div className="App">
      <div className="inputContainer">
        <input
          type="file"
          accept="text/csv"
          onChange={handleFile}
          className="fileInput"
        />
        {fileError !== null && <p className="error">{fileError}</p>}
      </div>
      {result.length > 0 && (
        <>
          {!completed ? (
            <form className="mainContainer" onSubmit={(e) => handleSubmit(e)}>
              <div className="imageToMatch">
                <img
                  src={result[id]["Image To Match"]}
                  alt=""
                  className={`image`}
                />
                <h2>{`Image To Match (Row Id: ${result[id]["ID"]})`}</h2>
              </div>
              <div className="imageContainer">
                <img
                  src={result[id]["Image 1"]}
                  alt=""
                  className={`image ${
                    selectedImage === result[id]["Image 1"] && `selectedImage`
                  }`}
                  onClick={() => handleClick(result[id]["Image 1"])}
                />
                <img
                  src={result[id]["Image 2"]}
                  alt=""
                  className={`image ${
                    selectedImage === result[id]["Image 2"] && `selectedImage`
                  }`}
                  onClick={() => handleClick(result[id]["Image 2"])}
                />
                <img
                  src={result[id]["Image 3"]}
                  alt=""
                  className={`image ${
                    selectedImage === result[id]["Image 3"] && `selectedImage`
                  }`}
                  onClick={() => handleClick(result[id]["Image 3"])}
                />
                <img
                  src={result[id]["Image 4"]}
                  alt=""
                  className={`image ${
                    selectedImage === result[id]["Image 4"] && `selectedImage`
                  }`}
                  onClick={() => handleClick(result[id]["Image 4"])}
                />
                <img
                  src={result[id]["Image 5"]}
                  alt=""
                  className={`image ${
                    selectedImage === result[id]["Image 5"] && `selectedImage`
                  }`}
                  onClick={() => handleClick(result[id]["Image 5"])}
                />
                <img
                  src={result[id]["Image 6"]}
                  alt=""
                  className={`image ${
                    selectedImage === result[id]["Image 6"] && `selectedImage`
                  }`}
                  onClick={() => handleClick(result[id]["Image 6"])}
                />
                <img
                  src={result[id]["Image 7"]}
                  alt=""
                  className={`image ${
                    selectedImage === result[id]["Image 7"] && `selectedImage`
                  }`}
                  onClick={() => handleClick(result[id]["Image 7"])}
                />
                <img
                  src={result[id]["Image 8"]}
                  alt=""
                  className={`image ${
                    selectedImage === result[id]["Image 8"] && `selectedImage`
                  }`}
                  onClick={() => handleClick(result[id]["Image 8"])}
                />
                <img
                  src={result[id]["Image 9"]}
                  alt=""
                  className={`image ${
                    selectedImage === result[id]["Image 9"] && `selectedImage`
                  }`}
                  onClick={() => handleClick(result[id]["Image 9"])}
                />
                <img
                  src={result[id]["Image 10"]}
                  alt=""
                  className={`image ${
                    selectedImage === result[id]["Image 10"] && `selectedImage`
                  }`}
                  onClick={() => handleClick(result[id]["Image 10"])}
                />
              </div>

              <div className="btnContainer">
                <button
                  type="button"
                  className={incorrect ? "activeBtn" : null}
                  onClick={() => setIncorrect(!incorrect)}
                >
                  incorrect image format
                </button>
                <button
                  type="button"
                  className={similar ? "activeBtn" : null}
                  onClick={() => setSimilar(!similar)}
                >
                  similar match
                </button>
                <button
                  type="button"
                  className={match ? "activeBtn" : null}
                  onClick={() => setMatch(!match)}
                >
                  no match
                </button>
              </div>

              <div className="submitBtnContainer">
                {id > 0 && (
                  <>
                    <button
                      type="button"
                      className="skipBtn"
                      onClick={() => handleLeftClick()}
                    >
                      pre page
                    </button>
                    <p>or</p>
                  </>
                )}
                <button type="submit">submit</button>
                {id < result.length - 1 && (
                  <>
                    <p>or</p>
                    <button
                      type="button"
                      className="skipBtn"
                      onClick={() => handleRightClick()}
                    >
                      next page
                    </button>
                  </>
                )}
              </div>

              <div className="btnContainer">
                <button type="button" onClick={() => handleDownload()}>
                  Download Edited CSV
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="submitBtnContainer">
                <button
                  type="button"
                  className="skipBtn"
                  onClick={() => handleLeftClick()}
                >
                  pre page
                </button>
                <button type="button" onClick={() => handleDownload()}>
                  Download Edited CSV
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;
