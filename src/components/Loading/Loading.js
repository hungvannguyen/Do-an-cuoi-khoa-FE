function Loading({ isLoading }) {
  return (
    <>
      {isLoading && (
        <div id="preloder">
          <div className="loader"></div>
        </div>
      )}
    </>
  );
}
export default Loading;
