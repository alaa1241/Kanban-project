import { useContext } from "react";
import { DataContext } from "../dataConetext";
import { produce } from "immer";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Card = ({ title, columnId, cardId, cardIndex, columnIndex }) => {
  const { setData, selectedBoardIndex } = useContext(DataContext);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: cardId,
      data: { columnId },
    });

  const onDeleteHandler = () => {
    if (window.confirm("Are you sure you want to delete this card?"))
      setData((prev) =>
        produce(prev, (draft) => {
          draft[selectedBoardIndex].columns[columnIndex].tasks = draft[
            selectedBoardIndex
          ].columns[columnIndex].tasks.filter((task) => task.id !== cardId);
        })
      );
  };

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      className="group/card relative min-h-16 overflow-y-hidden rounded-lg bg-white px-4 py-3 shadow-sm"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <button className="peer h-full text-start text-heading-m">{title}</button>
      <button
        className="absolute bottom-0 right-0 top-0 bg-white p-2 text-body-m text-red opacity-0 shadow duration-300 focus:opacity-100 group-hover/card:opacity-100 peer-focus:opacity-100"
        onClick={onDeleteHandler}
      >
        Delete
      </button>
    </div>
  );
};

export default Card;
