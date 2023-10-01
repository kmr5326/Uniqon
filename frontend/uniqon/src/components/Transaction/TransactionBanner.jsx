import React from "react";
import { useState } from "react";
import axios from "axios";
import { Button, Input,
Dialog, Typography, Card, CardBody, CardFooter, CardHeader } from "@material-tailwind/react";

import useUserInfoStore from "../../stores/UserInfoStore";

export function TransactionBanner() {

  const [ word, setWord ] = useState("");
  const { accessToken, walletAddress } = useUserInfoStore();
  // const URL = "http://localhost:5000"
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => { setOpen(!open); };

  const [searchList, setSearchList] = useState([]);





  async function searchSales() {

    const params = {
      word: word,
      walletAddress: walletAddress,
      page: 0,
      size: 9,
    };

    try {
      const res = await axios.get("/api/sales/search",{
        headers: {
          Authorization: "Bearer " + accessToken,
          },
      }, {
        params: params,
      });
        console.log(word)
        console.log(res.data.response)
        setSearchList(res.data.response)

    } catch(err) {
      console.log(err)
    }
  }


  return(
    <>
    <div className="bg-[#c1dcdc] flex flex-row justify-center rounded-[20px]">
      <div className="bg-[#c1dcdc] w-[1178px] h-[372px] relative rounded-md">
        <div className="absolute w-[493px] h-[59px] top-[206px] left-[53px] bg-[#ffffff] rounded-[7px] overflow-hidden">
        <div className="flex flex-col items-end gap-6 w-72">

        <Input
          type="word"
          label="판매글 검색"
          className="w-[500px] mt-2 bg-white"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              searchSales();
              handleOpen();
            }
          }}
          style={{ color: 'black' }}
        ></Input>
        </div>
          <div className="absolute w-[41px] h-[38px] top-[11px] left-[438px] bg-[100%_100%]">
            
            <img onClick={searchSales} className="absolute w-[20px] h-[19px] top-[10px] left-[11px]" alt="Search" src="Search.svg" />
          </div>
        </div>
        <img
          className="absolute w-[207px] h-[100px] top-[198px] left-[571px]"
          alt="Vector stroke"
          src="Vector186.svg"
        />
        <img className="absolute w-[350px] h-[320px] top-[50px] left-[778px] bg-[100%_100%]" src="heedong2.png" alt="heedong2">
        </img>
        <p className="absolute w-[800px] top-[87px] left-[-40px] [font-family:'Segoe_UI-Bold',Helvetica] font-bold text-black [text-shadow:0px_4px_4px_#00000040] text-[40px] tracking-[0] leading-[24.9px]">
          비밀의 동물원, 여기서 NFT로 만나보세요!
        </p>
        <div className="absolute w-[375px] top-[150px] left-[-10px] [font-family:'Segoe_UI-Bold',Helvetica] font-bold [text-shadow:0px_4px_4px_#00000040] text-black text-[23px] tracking-[0] leading-[24.9px]">
          디지털 아카이브: 희귀동물의 이야기
        </div>
      </div>
    </div>
    {/* <Button color="red" onClick={searchSales}>판매 검색</Button>
        <br></br> */}
    <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardHeader
            variant="gradient"
            color="blue"
            className="grid mb-4 h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              검색 목록
            </Typography>
          </CardHeader>

          <CardBody className="overflow-y-scroll max-h-[400px]">
      {searchList.map((item) => (
        <div key={item.id} className="flex flex-col gap-4">
          <img src={item.image} alt="my-gif" />
          <span className="text-lg">
            <span className="font-bold">{item.title}</span>
          </span>
          <span className="text-lg">
            가격 | <span className="font-bold">{item.price} ETH</span>
          </span>
        </div>
      ))}
    </CardBody>
          


          <CardFooter className="pt-0">
            <Button variant="gradient" onClick={() => {handleOpen();}} fullWidth>
              목록 닫기
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  )
}