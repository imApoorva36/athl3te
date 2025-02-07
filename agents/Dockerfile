FROM python:3.9

WORKDIR /app

COPY . /app

RUN pip install fastapi uvicorn langchain openai langchain_openai python-dotenv pydantic  # Add more dependencies if needed

CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "3000"]
