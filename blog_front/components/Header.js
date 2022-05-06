import Link from "next/link";
import Button from "./Button";

const Header = () => {
  return (
    <div className=" w-full h-20 border-b pt-5 bg-gray-200 shadow-lg">
      <div className="float-left align-baseline  pl-5 ">
        <Link href="/" passHref>
          <a>
            <h1 className="text-3xl font-bold">BLOG</h1>
          </a>
        </Link>
      </div>
      <div className="flex justify-end pr-5">
        <Link href="/SignUp" passHref>
          <a>
            <Button type="button" variant="none">
              sign up
            </Button>
          </a>
        </Link>
        <Link href="/SignIn" passHref>
          <a>
            <Button type="button" variant="primary">
              sign in
            </Button>
          </a>
        </Link>
      </div>
    </div>
  );
};
export default Header;
