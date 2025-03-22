import React, { useState, useEffect } from "react";
import { Collapse, Button, Flex } from "antd";
import "./header.css";

const useCollapsible = (key: string) => {
  const [isExpanded, setIsExpanded] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem("headerExpanded", JSON.stringify(isExpanded));
  }, [isExpanded]);

  const toggleHeader = () => {
    setIsExpanded((prev: boolean) => !prev);
  };

  return { isExpanded, toggleHeader };
};

const Collapsible = ({
  content,
  className,
}: {
  content: React.ReactNode;
  className?: string;
}) => {
  const { isExpanded, toggleHeader } = useCollapsible("widgets");

  return (
    <Flex vertical gap={4}>
      <Button
        type="text"
        onClick={toggleHeader} 
        className='collapsible-btn'      >
        {isExpanded ? "Свернуть" : "Развернуть"}
      </Button>
      <Collapse
        items={[
          {
            key: "1",
            label: null,
            children: content,
            headerClass: className ? className : "",
          },
        ]}
        activeKey={isExpanded ? ["1"] : []}
        bordered={false}
        // style={{
        //   background: '#eee',
        //   border: 'none'
        // }}
      />
    </Flex>
  );
};

const Header: React.FC = () => {
  return (
    <Collapsible 
      className="header-hidden"
      content={<p>Some content</p>} 
    />
  );
};

export default Header;
