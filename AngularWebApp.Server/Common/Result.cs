namespace AngularWebApp.Server.Common
{
    public class Result<T>
    {
        public bool IsSuccess { get; }
        public List<string> Errors { get; }
        public T Value { get; }

        protected Result(bool isSuccess, T value, List<string> errors)
        {
            IsSuccess = isSuccess;
            Value = value;
            Errors = errors;
        }

        public static Result<T> Success(T value)
            => new Result<T>(true, value, new List<string>());

        public static Result<T> Failure(params string[] errors)
            => new Result<T>(false, default, errors.ToList());
    }

    public class Result : Result<object>
    {
        private Result(bool isSuccess, List<string> errors)
            : base(isSuccess, null, errors) { }

        public static Result Success()
            => new Result(true, new List<string>());

        public static Result Failure(params string[] errors)
            => new Result(false, errors.ToList());
    }
}