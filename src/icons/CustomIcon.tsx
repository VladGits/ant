import React from 'react';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

// Define the props type based on Ant Design's icon props
interface CustomIconProps extends Partial<CustomIconComponentProps> {
  // Add any custom props specific to your icon if needed
}

const CustomSvg = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 5C0 2.23858 2.23858 0 5 0H19C21.7614 0 24 2.23858 24 5V19C24 21.7614 21.7614 24 19 24H5C2.23858 24 0 21.7614 0 19V5Z"
      fill="#FF9800" // Keeping original fill
    />
    <path
      d="M4.94287 17.0361V7.03613H18.9429V17.0361H14.9429V10.0361H8.94287V17.0361H4.94287Z"
      fill="white" // Keeping original fill
    />
    <path
      d="M14.9429 10.0361V13.0556L17.9429 10.0361H14.9429Z"
      fill="#FF9800" // Keeping original fill
    />
  </svg>
);


export const CustomIcon: React.FC<CustomIconProps> = (props) => {
  // Use Ant Design's Icon component to wrap the SVG
  // It handles className, style, spin, etc.
  // However, a simpler approach for direct SVG usage is just passing props:
  const { style, className } = props;
  return React.cloneElement(<CustomSvg />, { style, className });

  // If you need full compatibility with Ant Design's Icon component features like `spin`:
  // import Icon from '@ant-design/icons';
  // return <Icon component={CustomSvg} {...props} />;
};

// Optional: Set display name for easier debugging
CustomIcon.displayName = 'CustomIcon'; 