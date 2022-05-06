import moment from "moment";
// import Link from "next/link";
import { useEffect, useState } from "react";
// import AppContext from "./AppContext";

const Comment = (props) => {
  const { comment } = props;
  return (
    <div className="block px-5 ">
      <div className="flex flex-col border bg-slate-100 border-grey-light w-1/3 rounded p-2">
        <div className="text-2xl text-bold">{comment.users.displayName}</div>
        <div>{comment.content}</div>
        <div className="flex justify-end text-gray-600 text-sm italic">
          {moment(comment.createdAt).format("dddd MMM yyyy - HH:mm")}
        </div>
      </div>
    </div>
  );
};

export default Comment;
