import TestTemplate from 'src/core/templates/TestTemplate';
import { useQuery } from '@tanstack/react-query';
import apiClient from '../http-common';

const TestPage = () => {
  const fetchAllProducts = async () => {
    return await apiClient.get('/products');
  };
  const { data, status } = useQuery({
    queryKey: ['allProducts'],
    queryFn: fetchAllProducts,
    retry: 0,
  });

  // #TODO remove it when Failed Orders is fully implemented!
  // Note: To test the cancel order modal and the order cancellation logic,
  // move below commented code to the following file -> src\core\molecules\ShippingAddressPreview\ShippingAddressPreview.tsx
  // example of how it should be - https://dev.azure.com/LifesAbundanceSoftware/Sitecore/_git/Sitecore/commit/cedd0386615fad57e13f9c27829def4e498c9029?refName=refs%2Fheads%2Ffeature%2FLIF-6208-cancel-order-ca26

  // const [, setModal] = useAtom(modalAtom);
  // const { isLoading, data } = useFailedOrders({
  //   onSuccess: (data) => {
  //     console.log('data', data);
  //   },
  // });
  // function getFailedOrdersContent() {
  //   return (
  //     <div>
  //       <h1>Failed Orders Dummy data</h1>
  //       <ul>
  //         {data?.map((item: IFailedOrder, index: number) => {
  //           return (
  //             <li
  //               key={`${item.id}${index}`}
  //               className="cursor-pointer"
  //               onClick={() => {
  //                 console.log('onClick');
  //                 setModal(
  //                   createModal(
  //                     MODAL.COMPONENT,
  //                     '',
  //                     <CancelOrderModal id={item.id}></CancelOrderModal>
  //                   )
  //                 );
  //               }}
  //             >
  //               {item.id}
  //             </li>
  //           );
  //         })}
  //       </ul>
  //     </div>
  //   );
  // }
  return (
    <>
      {/* {!isLoading && data && getFailedOrdersContent(data)} */}
      <div>{JSON.stringify({ data, status })}</div>
      <TestTemplate />
    </>
  );
};

export default TestPage;
