import React from "react";
import Image from "next/image";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <section className="hidden w-1/2 items-center justify-center bg-brand p-10 lg:flex xl:w-2/5">
        <div className="flex max-h-[800px] max-w-[430px] flex-col justify-center space-y-12">
          <div className="flex items-center gap-5">
            <Image
              src="/assets/images/logo.png"
              alt="logo"
              width={60}
              height={60}
              className="h-auto"
            />
            <h1 className="text-3xl text-white ">CloudWise</h1>
          </div>

          <div className="space-y-5 text-white">
            <h1 className="h1">Manage your files the best way</h1>
            <p className="body-1">
              This is a place where you can store all yout documents.
            </p>
          </div>
          <div>
            <Image
              src="/assets/images/files.png"
              alt="Files"
              width={342}
              height={342}
              className="transition-all hover:rotate-2 hover:scale-105"
            ></Image>
          </div>
        </div>
      </section>
      <section className="flex flex-1 flex-col items-center bg-white p-4 py-10 lg:justify-center">
        <div className="mb-16 lg:hidden">
          <div className="flex items-center gap-5">
            <Image
              src="/assets/images/logo2.png"
              alt="logo"
              width={50}
              height={55}
              className="h-auto"
            ></Image>
            <h1 className="text-3xl text-brand ">CloudWise</h1>
          </div>
        </div>
        {children}
      </section>
    </div>
  );
};

export default Layout;
