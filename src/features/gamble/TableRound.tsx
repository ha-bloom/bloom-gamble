import React, { FC, useCallback, useState } from "react"

import { IGambleRound, removeRound, selectEndGame } from "./gambleSlice"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import ConfirmDeleteRoundModal from "./ConfirmDeleteRoundModal"

export interface ITableRoundProps {
  round: IGambleRound
  index: number
  isAbleToDelete?: boolean
}

const TableRound: FC<ITableRoundProps> = ({ round, index, isAbleToDelete }) => {
  const [openConfirm, setOpenConfirm] = useState(false)
  const dispatch = useAppDispatch()
  const isMax = useCallback(
    (point: number) => {
      const max = Math.max(round.A, round.B, round.C, round.D)
      return max === point
    },
    [round],
  )

  const isGameEnded = useAppSelector(selectEndGame)

  const deleteRound = useCallback(() => {
    setOpenConfirm(true)
  }, [])

  const confirmDeleteRound = useCallback(() => {
    dispatch(removeRound(index))
    setOpenConfirm(false)
  }, [index, dispatch])

  const closeConfirm = useCallback(() => {
    setOpenConfirm(false)
  }, [])

  return (
    <tr>
      <td className="text-gray-300">{index + 1}</td>
      <td className={isMax(round.A) ? "text-red-500" : ""}>
        {round.A <= -26 ? "💀" : ""}
        {round.A}
      </td>
      <td className={isMax(round.B) ? "text-red-500" : ""}>
        {round.B <= -26 ? "💀" : ""}
        {round.B}
      </td>
      <td className={isMax(round.C) ? "text-red-500" : ""}>
        {round.C <= -26 ? "💀" : ""}
        {round.C}
      </td>
      <td className={isMax(round.D) ? "text-red-500" : ""}>
        {round.D <= -26 ? "💀" : ""}
        {round.D}
      </td>
      <td>
        {isAbleToDelete && !isGameEnded ? (
          <button
            title="Delete row"
            type="button"
            className="bg-red-500 text-white text-2xl p-3 rounded-full"
            onClick={deleteRound}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
        ) : null}

        <ConfirmDeleteRoundModal
          round={round}
          isOpen={openConfirm}
          closeModal={closeConfirm}
          confirm={confirmDeleteRound}
        />
      </td>
    </tr>
  )
}

export default TableRound
