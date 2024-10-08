import {
  type ElementRef,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';

import { ScrollArea, ScrollBar } from '@/lib/components/ui/scroll-area';
import { cn } from '@/lib/utils';

export interface ScrollAreaWrapperProps {
  scrollable: boolean;
  className?: string;
  children?: ReactNode;
}
export const ScrollAreaWrapper = ({
  scrollable,
  className,
  children,
}: ScrollAreaWrapperProps) => {
  const ref = useRef<ElementRef<typeof ScrollArea> | null>(null);

  const [isOverflow, setIsOverflow] = useState(false);
  useEffect(() => {
    const lastElementChild = ref.current?.lastElementChild;
    if (!lastElementChild) return;
    const observer = new ResizeObserver(() => {
      if (
        lastElementChild?.scrollWidth > lastElementChild.clientWidth &&
        !isOverflow
      ) {
        setIsOverflow(true);
      } else if (
        lastElementChild?.scrollWidth <= lastElementChild.clientWidth &&
        isOverflow
      ) {
        setIsOverflow(false);
      }
    });
    observer.observe(lastElementChild);
    return () => {
      observer.disconnect();
    };
  }, [isOverflow]);

  return scrollable ? (
    <ScrollArea className={cn(isOverflow && 'pb-2', className)} ref={ref}>
      {children}
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  ) : (
    children
  );
};
