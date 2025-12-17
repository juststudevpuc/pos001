import { CircleMinus, CirclePlus } from "lucide-react";

export default function Counter({ counter, onIncrement, onDecrement }) {
  return (
    <div
      style={{
        // width: "100vw",
        // height: "100vh",
        // backgroundColor: "red",
        padding: "1rem",
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className=""
        style={{
          backgroundColor: "gray",
          padding: "1rem",
          borderRadius: "1rem",
        }}
      >
        <h1 style={{ textAlign: "center" }}>{counter}</h1>
        <div className="" style={{ display: "flex", gap: "1rem" }}>
          <button
            style={{
              outline: "none",
              border: "none",
              padding: "0.5rem",
              borderRadius: "1rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={onIncrement}
          >
            <CirclePlus />
          </button>
          <button
            style={{
              outline: "none",
              border: "none",
              padding: "0.5rem",
              borderRadius: "1rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={onDecrement}
          >
            <CircleMinus />
          </button>
        </div>
      </div>
    </div>
  );
}
