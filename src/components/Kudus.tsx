'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';


interface Props {
  data: Kudu[]
}

export default function Kudus({ data }: Props) {
  const [search, setSearch] = useState('');
  const [continentFilter, setContinentFilter] = useState('');
  const [hornFilter, setHornFilter] = useState('');

  const filtered = data.filter((e) =>
    (!search || e.name.toLowerCase().includes(search.toLowerCase())) &&
    (!continentFilter || e.continent === continentFilter) &&
    (!hornFilter || e.horns === hornFilter)
  );

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  function handleFilterByContinent(e: React.ChangeEvent<HTMLSelectElement>) {
    setContinentFilter(e.target.value);
  }

  function handleFilterByHorn(e: React.ChangeEvent<HTMLSelectElement>) {
    setHornFilter(e.target.value);
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="grid md:grid-cols-3 grid-cols-1 mb-6 justify-center items-center w-full">
        <div className="p-2">
          <label className="block mb-2 text-sm font-medium text-gray-500">Sarch by name</label>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg w-full pl-10 p-2.5"
            placeholder="Search"
            onChange={handleSearch}
          />
        </div>

        <div className="p-2">
          <label className="block mb-2 text-sm font-medium text-gray-500">Sarch by continent</label>
          <select defaultValue="" className="bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg w-full p-2.5" onChange={handleFilterByContinent}>
            <option value="">All</option>
            <option value="Africa">Africa</option>
            <option value="Asia">Asia</option>
          </select>
        </div>

        <div className="p-2">
          <label className="block mb-2 text-sm font-medium text-gray-500">Sarch by horn</label>
          <select defaultValue="" className="bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg w-full p-2.5" onChange={handleFilterByHorn}>
            <option value="">All</option>
            <option value="Curved">Curved</option>
            <option value="Spiraled">Spiraled</option>
            <option value="Lyre-shaped">Lyre-shaped</option>
            <option value="Straight">Straight</option>
            <option value="Twisted">Twisted</option>
            <option value="Spiky">Spiky</option>
          </select>
        </div>
      </div>

      <Table>
        <Thead>
          <Tr className="bg-slate-500 text-white">
            <Th>Picture</Th>
            <Th>Name</Th>
            <Th>Continent</Th>
            <Th>Height</Th>
            <Th>Weight</Th>
            <Th>Horns</Th>
            <Th>Details</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filtered.map((kudu: any) => (
            <Tr className="mb-4 bg-slate-100 text-center" key={kudu.name}>
              <Td className="px-6 py-4">
                <Image
                  className="w-10 h-10 rounded-lg"
                  src={kudu.picture}
                  alt={kudu.name}
                  height={1024}
                  width={1024}
                />
              </Td>
              <Td>{kudu.name}</Td>
              <Td>{kudu.continent}</Td>
              <Td>{kudu.height}</Td>
              <Td>{kudu.weight}</Td>
              <Td>{kudu.horns}</Td>
              <Td><a href={`https://www.google.com/search?q=${kudu.name}%20kudu`} className="text-blue-600" target="__blank">Learn more</a></Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  )
}


