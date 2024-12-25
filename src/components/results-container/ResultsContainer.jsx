import HotelViewCard from 'components/hotel-view-card/HotelViewCard';
import VerticalFilters from 'components/vertical-filters/VerticalFilters';
import HotelViewCardSkeleton from 'components/hotel-view-card-skeleton/HotelViewCardSkeleton';
import VerticalFiltersSkeleton from 'components/vertical-filters-skeleton/VerticalFiltersSkeleton';
import EmptyHotelsState from 'components/empty-hotels-state/EmptyHotelsState';
import { useRef, useState } from 'react';
import useOutsideClickHandler from 'hooks/useOutsideClickHandler';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';

const ResultsContainer = ({
  hotelsResults,
  enableFilters,
  filtersData,
  selectedFiltersState,
  onFiltersUpdate,
  onClearFiltersAction,
  sortingFilterOptions,
  sortByFilterValue,
  onSortingFilterChange,
}) => {
  const [isVerticalFiltersOpen, setIsVerticalFiltersOpen] = useState(false);

  const wrapperRef = useRef();
  const buttonRef = useRef();

  useOutsideClickHandler(wrapperRef, (event) => {
    if (!buttonRef.current.contains(event.target)) {
      setIsVerticalFiltersOpen(false);
    }
  });

  const toggleVerticalFiltersAction = () => {
    setIsVerticalFiltersOpen((prevState) => !prevState);
  };

  const isSortingFilterVisible =
    sortingFilterOptions && sortingFilterOptions.length > 0;

  return (
    <div className="relative">
      <div className="flex gap-x-0 md:gap-x-4 items-start mx-2">
        {enableFilters && (
          <div ref={wrapperRef}>
            {filtersData?.isLoading ? (
              <VerticalFiltersSkeleton />
            ) : (
              <VerticalFilters
                filtersData={filtersData}
                onFiltersUpdate={onFiltersUpdate}
                onClearFiltersAction={onClearFiltersAction}
                isVerticalFiltersOpen={isVerticalFiltersOpen}
              />
            )}
          </div>
        )}
        <div className="flex flex-col w-full items-start">
          <div className="flex w-full justify-between px-2 md:px-0">
            {enableFilters && (
              <button
                ref={buttonRef}
                onClick={toggleVerticalFiltersAction}
                className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <FontAwesomeIcon icon={faFilter} size="sm" className="mr-1" /> Filters
              </button>
            )}
            {isSortingFilterVisible && (
              <Select
                value={sortByFilterValue}
                onChange={onSortingFilterChange}
                options={sortingFilterOptions}
                className="mb-2 w-[180px] text-sm"
              />
            )}
          </div>
          <div className="hotels-results__container mx-2 md:mx-0 flex flex-col gap-y-2 w-full">
            {hotelsResults?.isLoading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <HotelViewCardSkeleton key={index} />
              ))
            ) : hotelsResults?.data?.length > 0 ? (
              hotelsResults.data.map((hotel) => (
                <HotelViewCard
                  key={hotel.id}
                  id={hotel.id}
                  name={hotel.name}
                  address={hotel.address}
                  amenities={hotel.amenity_groups}
                  images={hotel.images}
                  ratings={hotel.star_rating}
                  checkInTime={hotel.check_in_time}
                  checkOutTime={hotel.check_out_time}
                  price={hotel.price} // Add price if available in the data
                />
              ))
            ) : (
              <EmptyHotelsState />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsContainer;
