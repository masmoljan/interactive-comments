

const Title = () => {
  return (
    <div className="p-6 pb-0 text-justify bg-slate-100 rounded-t-lg">
      <h2 className="text-2xl/7 font-bold text-slate-900 text-center">
        Interactive Comments
      </h2>
      <ul 
        className="list-disc text-base text-slate-900 dark:text-white pt-2 ml-6 mr-6"
      >
        <li>
          Comments and replies can be rated with comments 
          being ordered by rating (descending) and replies 
          ordered by time replied (oldest to newest)
        </li>
        <li>Logged users can edit and delete their own comments</li>
        <li>
          No API is currently being used and all data is persisted in 
          local storage
        </li>
      </ul>
    </div>
  );
};

export default Title;
