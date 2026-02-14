import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Don't render breadcrumbs on the root path if you don't want to
  if (pathnames.length === 0) return null;

  return (
    <div className="breadcrumbs">
      <Link to="/">Home</Link>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        
        // Format the name: "leave-request" -> "Leave Request"
        const name = value
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

        return (
          <span key={to} className="breadcrumb-item">
            <span className="breadcrumb-separator">/</span>
            {isLast ? (
              <span className="breadcrumb-active">{name}</span>
            ) : (
              <Link to={to}>{name}</Link>
            )}
          </span>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;