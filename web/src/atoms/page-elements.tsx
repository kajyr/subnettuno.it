import classNames from 'classnames';
import React, { FC } from 'react';

export const columnClasses = 'mx-auto my-0 w-10/12 max-w-6xl';

export const Column: FC<{ className?: string }> = ({ children, className }) => {
  return <div className={classNames(columnClasses, className)}>{children}</div>;
};

export const PageTitle: FC<{ className?: string }> = ({
  children,
  className,
}) => {
  return <h2 className={classNames('mb-6 py-2', className)}>{children}</h2>;
};
