import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useInfiniteScroll from 'react-infinite-scroll-hook';

const InfiniteScroll = ({
  children,
  delayInMs,
  disabled,
  initialPage,
  loading,
  onLoadMore,
  rootMargin,
  totalPages,
}) => {
  const [page, setPage] = useState(initialPage);
  const [hasNextPage, setHasNextPage] = useState(true);

  useEffect(() => {
    setHasNextPage(totalPages > page);
  }, [page, totalPages]);

  const loadMore = useCallback(() => {
    onLoadMore(page + 1);
    setPage((p) => p + 1);
  }, [page, onLoadMore]);

  const [sentryRef] = useInfiniteScroll({
    delayInMs,
    disabled,
    loading,
    hasNextPage,
    onLoadMore: loadMore,
    rootMargin,
  });

  if (typeof children !== 'function') {
    console.warn("Infinite Scroll expects a function as it's children");
    return null;
  }

  return children({ sentryRef, page, hasNextPage });
};

InfiniteScroll.propTypes = {
  children: PropTypes.func.isRequired,
  delayInMs: PropTypes.number,
  disabled: PropTypes.bool,
  initialPage: PropTypes.number,
  loading: PropTypes.bool.isRequired,
  onLoadMore: PropTypes.func.isRequired,
  rootMargin: PropTypes.string,
  totalPages: PropTypes.number.isRequired,
};

InfiniteScroll.defaultProps = {
  delayInMs: 100,
  disabled: false,
  initialPage: 1,
  rootMargin: null,
};

export default InfiniteScroll;
