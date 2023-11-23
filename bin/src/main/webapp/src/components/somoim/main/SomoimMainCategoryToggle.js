import React, {forwardRef, useState} from 'react';
import {Justify} from 'react-bootstrap-icons';
import Form from 'react-bootstrap/Form';

const customToggleStyle = {
    color: '#625C5C', 
    textDecoration: 'none', 
    cursor: 'pointer', 
    fontSize: 18,
    fontWeight: 700
  };
  
  // 수정된 CustomToggle 컴포넌트
  const CustomToggle = forwardRef(({ children, onClick }, ref) => (
    <a
      href="/"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      style={customToggleStyle} // Apply custom styles
    >
      <div style={{ textAlign: 'center'}}><Justify size={30} /></div>
      {children}
    </a>
  ));
  
  // 수정된 CustomMenu 컴포넌트
  const CustomMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
      const [value, setValue] = useState('');
  
      const itemsPerRow = 3; 
  
      const rows = [];
      let currentRow = [];
  
      React.Children.toArray(children)
        .filter(
          (child) =>
            !value || child.props.children.toLowerCase().startsWith(value)
        )
        .forEach((child, index) => {
          if (index > 0 && index % itemsPerRow === 0) {
            rows.push(currentRow);
            currentRow = [];
          }
          currentRow.push(child);
        });
  
      if (currentRow.length > 0) {
        rows.push(currentRow);
      }
  
      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <Form.Control
            autoFocus
            className="mx-3 my-2"
            placeholder="Type to filter..."
            onChange={(e) => setValue(e.target.value)}
            style={{ width: '180px' }}
            value={value}
          />
          <ul className="list-unstyled">
            {rows.map((row, rowIndex) => (
              <div key={rowIndex} className="d-flex justify-content-center">
                {row.map((child, colIndex) => (
                  <li key={colIndex}>{child}</li>
                ))}
              </div>
            ))}
          </ul>
        </div>
      );
    }
  );
    /*
  const CustomMenu = forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
      const [value, setValue] = useState('');
  
      return (
        <div
          ref={ref}
          style={{ ...style, minWidth: '200px' }}
          className={className}
          aria-labelledby={labeledBy}
        >
          <Form.Control
            autoFocus
            className="mx-3 my-2 w-auto"
            placeholder="Type to filter..."
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
          <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
              (child) =>
                !value || child.props.children.toLowerCase().startsWith(value),
            )}
          </ul>
        </div>
      );
    },
  );*/
  
  export { CustomToggle, CustomMenu };