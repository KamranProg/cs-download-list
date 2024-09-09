"use client";
import React from "react";
import HeaderLinks from "@/ui/HeaderLinks/HeaderLinks";
import ThemeSwitch from "@/ui/ThemeSwitch/ThemeSwitch";

function Header() {
  return (
    <div className="flexBetweenRow">
      <HeaderLinks
        links={[
          { href: "/", text: "Home" },
          {
            href: "/paginated-list?page=1&per_page=5",
            text: "PaginatedList example",
          },
          {
            href: "/infinite-scroll",
            text: "InfiniteScroll example",
          },
        ]}
      >
        <ThemeSwitch />
      </HeaderLinks>
    </div>
  );
}

export default Header;
