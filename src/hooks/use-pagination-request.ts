import { DomUtils } from "@/lib/utils";
import {
  useAsyncEffect,
  useCreation,
  useInViewport,
  useRequest,
  useUpdateEffect,
} from "ahooks";
import { useEffect, useMemo, useState } from "react";

interface IProps {
  // request function to fetch data
  request: (props: any) => Promise<unknown>;

  // reference to the bottom element to determine whether fetch more data when it is in viewport
  bottomRef: React.RefObject<HTMLDivElement>;

  // limit number of data to fetch per request
  limit?: number;

  // dependencies to reset pagination when they change
  resetDeps: unknown[];

  // callback function to process the data returned by request function
  getData?: (res: any) => unknown[];

  // callback function to process the total number of data returned by request function
  getTotal?: (res: any) => number;

  // custom arguments to pass to request function (except page and offset)
  customArgs?: any;
}

export const usePaginationRequest = (props: IProps) => {
  const {
    request,
    bottomRef,
    limit = 30,
    resetDeps = [],
    getData,
    getTotal,
    customArgs = {},
  } = props;

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const [data, setData] = useState<any[] | undefined>(undefined);

  const [firstLoading, setFirstLoading] = useState(true);

  const offset = useMemo(() => (page - 1) * limit, [page, limit]);
  const { run: fetchMore, loading } = useRequest(
    () => request({ ...customArgs, page, offset: firstLoading ? 0 : offset }),
    {
      manual: true,
      onSuccess: (res: any) => {
        setPage((prev) => prev + 1);
        const resData = getData?.(res) || [];
        const total = getTotal?.(res) || 0;

        setTotal(total);
        setData(!data ? resData : [...(data || []), ...resData]);

        setFirstLoading(false);
      },
    }
  );

  useAsyncEffect(async () => {
    setPage(1);
    setFirstLoading(true);
    setData(undefined);
    setTotal(0);

    await new Promise((resolve) => setTimeout(resolve, 50));
    fetchMore();

    DomUtils.scrollAppMainContainerToTop();
  }, [...resetDeps]);

  const [bottomInView] = useInViewport(bottomRef);

  useUpdateEffect(() => {
    console.log(bottomInView, loading, data?.length, total, firstLoading);
    if (
      bottomInView &&
      !loading &&
      (data?.length || 0) < total &&
      !firstLoading
    ) {
      fetchMore();
    }
  }, [bottomInView]);

  return {
    data,
    total,
    firstLoading,
    loading,
  };
};
