import React, { useEffect, useState } from "react";
import { ReactComponent as LeftIcon } from "../assets/images/arrow-left.svg";
import { ReactComponent as RightIcon } from "../assets/images/arrow-right.svg";
import { ReactComponent as Icon1 } from "../assets/images/undraw_content_team.svg";
import { ReactComponent as Icon2 } from "../assets/images/undraw_mobile_analytics.svg";
import { ReactComponent as Icon3 } from "../assets/images/undraw_team_up.svg";
import { ReactComponent as Icon4 } from "../assets/images/undraw_well_done.svg";
import { ReactComponent as Icon5 } from "../assets/images/android2.svg";
import { ReactComponent as Icon6 } from "../assets/images/apple.svg";
import { ReactComponent as Icon7 } from "../assets/images/award.svg";
import { useDropzone } from "react-dropzone";
import { Tensor, InferenceSession } from "onnxjs";

export default function Home() {
  const [isScroll, setIsScroll] = useState(false);
  const [files, setFiles] = useState([]);
  const [output, setOutput] = useState();

  const session = new InferenceSession();

  useEffect(() => {
    const changeNavbar = () => {
      if (window.scrollY > 80) {
        setIsScroll(true);
        return;
      }
      setIsScroll(false);
    };

    window.addEventListener("scroll", changeNavbar);

    return () => window.removeEventListener("scroll", changeNavbar);
  }, []);

  const goTo = (position) => {
    document.documentElement.scrollTo({
      top: position,
      behavior: "smooth",
    });
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpg,image/png,image/jpeg",
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
      await session.loadModel("../model/pytorch_model.onnx");
      const inputs = [
        new Tensor(new Float32Array([1.0, 2.0, 3.0, 4.0]), "float32", [2, 2]),
      ];
      const outputs = await session.run(inputs);
      console.log(outputs);
      const outputTensor = outputs.values().next().value;
      console.log(outputTensor);
    },
    noDragEventsBubbling: true,
  });

  return (
    <>
      {!isScroll ? (
        <nav className="flex justify-between items-center bg-transparent px-32 py-3 fixed top-0 w-full text-white z-20 backdrop-filter backdrop-blur-lg bg-opacity-30">
          <div>Ini Logo</div>
          <ul className="flex gap-12">
            <li className="hover:text-black">
              <button onClick={() => goTo(0)}>Home</button>
            </li>
            <li className="hover:text-black">
              <button onClick={() => goTo(1000)}>About</button>
            </li>
          </ul>
          <button
            className="bg-blue-300 bg-opacity-40 hover:bg-opacity-25 cursor-pointer px-4 py-2 rounded-md"
            onClick={() => goTo(1500)}
          >
            Product
          </button>
        </nav>
      ) : (
        <nav className="flex justify-between items-center bg-white px-20 py-3 rounded-md shadow-lg fixed top-4 left-[50%] translate-x-[-50%] w-11/12 text-[#4F7AF6] z-20">
          <div>Ini Logo</div>
          <ul className="flex gap-12">
            <li className="hover:text-black">
              <button onClick={() => goTo(0)}>Home</button>
            </li>
            <li className="hover:text-black">
              <button onClick={() => goTo(1000)}>About</button>
            </li>
          </ul>
          <button
            className="bg-blue-300 bg-opacity-40 hover:bg-opacity-25 cursor-pointer px-4 py-2 rounded-md"
            onClick={() => goTo(1500)}
          >
            Product
          </button>
        </nav>
      )}

      <main className="scroll-smooth">
        <article
          className="bg-[#4F7AF6] min-h-[110vh] rounded-b-[2rem]"
          id="home"
        >
          <aside className="absolute top-[50%] text-white z-20">
            <button
              onClick={() => goTo(1000)}
              className="uppercase inline-flex items-center gap-4 transform -rotate-90 hover:translate-y-2 cursor-pointer"
            >
              <LeftIcon />
              <p className="text-sm">Scroll Down</p>
            </button>
          </aside>
          <section className="flex flex-col justify-center items-center min-h-[80vh] text-white relative">
            <h2 className="text-4xl font-bold w-5/12 text-center z-10">
              We offer Something That Can Segment Chest X-Ray
            </h2>
            <svg
              className="absolute w-5/12 opacity-30"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              viewBox="0 0 800 800"
            >
              <defs>
                <radialGradient id="cccircular-grad" r="50%" cx="50%" cy="50%">
                  <stop
                    offset="70%"
                    stop-color="hsl(205, 69%, 50%)"
                    stop-opacity="0"
                  ></stop>
                  <stop
                    offset="97%"
                    stop-color="#0061a5"
                    stop-opacity="1"
                  ></stop>
                </radialGradient>
              </defs>
              <g fill="url(#cccircular-grad)">
                <circle r="330" cx="400" cy="400" opacity="0.05"></circle>
                <circle r="297" cx="400" cy="400" opacity="0.16"></circle>
                <circle r="264" cx="400" cy="400" opacity="0.26"></circle>
                <circle r="231" cx="400" cy="400" opacity="0.37"></circle>
                <circle r="198" cx="400" cy="400" opacity="0.47"></circle>
                <circle r="165" cx="400" cy="400" opacity="0.58"></circle>
                <circle r="132" cx="400" cy="400" opacity="0.68"></circle>
                <circle r="99" cx="400" cy="400" opacity="0.79"></circle>
                <circle r="66" cx="400" cy="400" opacity="0.89"></circle>
              </g>
            </svg>
            <div className="z-10 space-x-6 mt-6">
              <button className="bg-white px-6 py-2 rounded-md text-[#728BDF] hover:bg-opacity-90">
                <button onClick={() => goTo(1500)}>Try It!</button>
              </button>
              <button className="bg-blue-300 bg-opacity-40 px-6 py-2 rounded-md text-white hover:bg-opacity-25">
                <button onClick={() => goTo(1000)}>More Info</button>
              </button>
            </div>
          </section>
          <section>
            <div className="bg-white shadow-md rounded-3xl w-7/12 absolute left-[50%] translate-x-[-50%]">
              <div className="grid grid-cols-2 p-6">
                <div className="bg-[#EDF4FF] rounded-md p-3 mr-3 mb-3 flex gap-4">
                  <Icon1 className="h-full w-full" />
                  <div>
                    <h3 className="font-semibold">Point 1</h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                  </div>
                </div>
                <div className="bg-[#EDF4FF] rounded-md p-3 mb-3 flex gap-4">
                  <Icon2 className="h-full w-full" />
                  <div>
                    <h3 className="font-semibold">Point 2</h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                  </div>
                </div>
                <div className="bg-[#EDF4FF] rounded-md p-3 mr-3 flex gap-4">
                  <Icon3 className="h-full w-full" />
                  <div>
                    <h3 className="font-semibold">Point 3</h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                  </div>
                </div>
                <div className="bg-[#EDF4FF] rounded-md p-3 flex gap-4">
                  <Icon4 className="h-full w-full" />
                  <div>
                    <h3 className="font-semibold">Point 4</h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </article>
        <article className="bg-[#FAFCFF] min-h-screen" id="about">
          <section className="flex flex-col gap-y-4 justify-center items-center min-h-screen text-[#403E60] mt-12 relative">
            <h2 className="text-4xl font-bold text-center">Some Header Here</h2>
            <h4 className="text-xl font-semibold text-center w-6/12">
              Sub-header goes here with Lorem ipsum dolor sit amet, consectetur
              adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </h4>
            <div className="flex gap-x-6 mt-12">
              <div className="bg-[#E9F1FC] px-12 pt-10 pb-6 rounded-md hover:bg-white hover:shadow-md group cursor-default relative">
                <div className="absolute -top-5 left-[50%] translate-x-[-50%] bg-[#4F7BF4] group-hover:bg-[#C0D2FE] text-white group-hover:text-[#1534EA] p-4 rounded-full shadow-lg">
                  <Icon5 />
                </div>
                <h4 className="text-lg font-semibold">Ini Judul Keterangan</h4>
              </div>
              <div className="bg-[#E9F1FC] px-12 pt-10 pb-6 rounded-md hover:bg-white hover:shadow-md group cursor-default relative">
                <div className="absolute -top-5 left-[50%] translate-x-[-50%] bg-[#4F7BF4] group-hover:bg-[#C0D2FE] text-white group-hover:text-[#1534EA] p-4 rounded-full shadow-lg">
                  <Icon6 />
                </div>
                <h4 className="text-lg font-semibold">Ini Judul Keterangan</h4>
              </div>
              <div className="bg-[#E9F1FC] px-12 pt-10 pb-6 rounded-md hover:bg-white hover:shadow-md group cursor-default relative">
                <div className="absolute -top-5 left-[50%] translate-x-[-50%] bg-[#4F7BF4] group-hover:bg-[#C0D2FE] text-white group-hover:text-[#1534EA] p-4 rounded-full shadow-lg">
                  <Icon7 />
                </div>
                <h4 className="text-lg font-semibold">Ini Judul Keterangan</h4>
              </div>
            </div>
          </section>
        </article>
        <article className="bg-[#FAFCFF] min-h-screen" id="segementation">
          <section className="flex flex-col gap-y-4 items-center min-h-screen text-[#403E60] relative">
            <h2 className="text-4xl font-bold text-center">
              Chest X-Ray Semantic Segmentation
            </h2>
            <div className="flex items-center gap-x-10 mt-12">
              <div {...getRootProps({ className: "dropzone" })} className="">
                <label htmlFor="image" className="text-lg font-semibold">
                  Input Image
                </label>
                <div className="flex min-h-[12rem] w-96 mt-1 justify-center items-center px-6 pt-5 pb-6 border-2 border-base-content border-dashed rounded-md">
                  <input {...getInputProps()} className="sr-only" />
                  {!files[0] ? (
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <p className="text-base">
                        Upload a file or drag and drop
                      </p>
                      <p className="text-xs">PNG, JPG, and JPEG</p>
                    </div>
                  ) : (
                    <img
                      className="w-96 min-h-[12rem]"
                      src={files[0].preview}
                      alt="Preview Input Image"
                    />
                  )}
                </div>
              </div>
              <RightIcon />
              <div>
                <p className="text-lg font-semibold">Output Image</p>
                <div className="flex min-h-[12rem] w-96 mt-1 justify-center items-center px-6 pt-5 pb-6 border-2 border-base-content border-dashed rounded-md">
                  {!output ? (
                    <div className="space-y-1 text-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        className="bi bi-image mx-auto h-12 w-12"
                        viewBox="0 0 16 16"
                      >
                        <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                        <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z" />
                      </svg>
                      <p className="text-base">
                        Output Image will be displayed here
                      </p>
                    </div>
                  ) : (
                    <img
                      className="w-96 h-full"
                      src={output}
                      alt="Preview Input Image"
                    />
                  )}
                </div>
              </div>
            </div>
          </section>
        </article>
      </main>
    </>
  );
}
