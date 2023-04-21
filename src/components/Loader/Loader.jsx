import { ThreeDots } from 'react-loader-spinner';

export function Loader() {
    return (
        <ThreeDots 
                      height="100" 
                      width="100" 
                      radius="9"
                      color="#A83AA2" 
                      ariaLabel="three-dots-loading"
                        wrapperStyle={{
                        display: "flex",
                        justifyContent: "center",
                        }}
                      wrapperClassName=""
                      visible={true}
          />
    )
}