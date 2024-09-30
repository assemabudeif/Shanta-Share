import React, { useEffect, useState } from 'react';
import DashboardPosts  from '../Components/DashboardPosts';
import {Outlet, useNavigate} from "react-router-dom";
import { useTranslation } from 'react-i18next';




export default function DashboardBase( props= {pages: [{page: "route", title: "Title"}], pathName: 'dashboard'}) {
  const pages = props.pages;
  const [posts, setPosts] = useState([]);
  const [orders, setOrders] = useState([]);
  const { t, i18n } = useTranslation();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedPage, setSelectedPage] = useState(
    pages.findIndex(function (page) {
      // console.log(window.location.pathname.includes(page.page));
      console.log(page.page);
      if (page.page === "") {
        return window.location.pathname === props.pathName || window.location.pathname === props.pathName + "/";
      } else {
        return window.location.pathname.includes(page.page);
      }
    })
  );
  console.log(window.location.pathname)
  // const [selectedComponent, setSelectedComponent] = useState(PagesComponent[0]);
  const navigate = useNavigate()
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const ChangePage = (index) => {
    setSelectedPage(index);
    navigate(pages[index].page);
  }
  useEffect(() => {

  }, []);
  useEffect(() => {
    // setSelectedComponent(PagesComponent[selectedPage]);
    console.log(selectedPage);
  }, [selectedPage]);


  return (
    <>
      <div className="grid grid-cols-12 md:max-w-[1920px]">
        <div className={`${isSidebarOpen ? "col-span-2" : "hidden"} h-screen w-full shadow-2xl bg-[#F3F3F3] sticky top-0 left-0`}>
          <h1 className="text-2xl font-bold text-center py-8">{t("dashboardAdmin.dashboard")}</h1>
          <div className="flex flex-col items-start w-full cursor-pointer">
            <div className={"w-full "}>
              {pages.map((page, index) => (
                <div className={"flex flex-wrap"} key={index}>
                  <div
                    className={`${selectedPage === index ? "bg-white" : "ps-5"} h-20 w-full text-black font-semibold text-xl flex flex-row items-center`}
                    onClick={() => {
                      navigate(page.page);
                      ChangePage(index)
                    }}>
                    {

                      index === selectedPage && (
                        <div className={"h-full w-5 border-l-8 border-black"}/>
                      )

                    }
                    <span> {page.title}</span>
                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>
        <div className={`${isSidebarOpen ? "col-span-10" : "col-span-12"}`}>
          <div className="bg-black h-20 flex items-center justify-between px-4">
            <div className={"flex"}>
              <div className="text-xl cursor-pointer" onClick={toggleSidebar}>
                <svg width="36" height="29" viewBox="0 0 36 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 27.2941C18 27.7465 18.1896 28.1804 18.5272 28.5004C18.8648 28.8203 19.3226 29 19.8 29L34.2 29C34.6774 29 35.1352 28.8203 35.4728 28.5004C35.8104 28.1804 36 27.7465 36 27.2941C36 26.8417 35.8104 26.4078 35.4728 26.0879C35.1352 25.768 34.6774 25.5882 34.2 25.5882L19.8 25.5882C19.3226 25.5882 18.8648 25.768 18.5272 26.0879C18.1896 26.4078 18 26.8417 18 27.2941ZM-1.1215e-06 18.7647C-1.07193e-06 19.2171 0.189641 19.651 0.527207 19.9709C0.864772 20.2909 1.32261 20.4706 1.8 20.4706L34.2 20.4706C34.6774 20.4706 35.1352 20.2909 35.4728 19.9709C35.8104 19.651 36 19.2171 36 18.7647C36 18.3123 35.8104 17.8784 35.4728 17.5585C35.1352 17.2385 34.6774 17.0588 34.2 17.0588L1.8 17.0588C1.32261 17.0588 0.864772 17.2386 0.527207 17.5585C0.189641 17.8784 -1.17107e-06 18.3123 -1.1215e-06 18.7647ZM25.2 1.70588C25.2 2.15831 25.3896 2.59221 25.7272 2.91213C26.0648 3.23204 26.5226 3.41177 27 3.41177L34.2 3.41177C34.6774 3.41177 35.1352 3.23204 35.4728 2.91213C35.8104 2.59221 36 2.15831 36 1.70588C36 1.25346 35.8104 0.819557 35.4728 0.499641C35.1352 0.179727 34.6774 1.30265e-06 34.2 1.31098e-06L27 1.43653e-06C26.5226 1.44485e-06 26.0648 0.179727 25.7272 0.499641C25.3896 0.819557 25.2 1.25346 25.2 1.70588ZM10.8 10.2353C10.8 10.6877 10.9896 11.1216 11.3272 11.4415C11.6648 11.7615 12.1226 11.9412 12.6 11.9412L34.2 11.9412C34.6774 11.9412 35.1352 11.7615 35.4728 11.4415C35.8104 11.1216 36 10.6877 36 10.2353C36 9.78287 35.8104 9.34897 35.4728 9.02905C35.1352 8.70914 34.6774 8.52941 34.2 8.52941L12.6 8.52941C12.1226 8.52941 11.6648 8.70914 11.3272 9.02905C10.9896 9.34897 10.8 9.78287 10.8 10.2353Z" fill="white"/>
                </svg>
              </div>

            </div>
          </div>
          <div className="p-4">
            <Outlet/>
          </div>
        </div>
      </div>
    </>
  );
}
