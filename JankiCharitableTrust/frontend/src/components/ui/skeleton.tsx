import React from 'react';

type SkeletonProps = React.HTMLAttributes<HTMLDivElement> & {
  rounded?: string;
};

export function Skeleton({ className = '', rounded = 'rounded-md', ...props }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-muted ${rounded} ${className}`}
      {...props}
    />
  );
}



