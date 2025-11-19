const ScheduleModule = () => {
    const days = [
        {
            day: "01",
            date: "Jan 28",
            time: "20:00 — till close",
            events: [
                {
                    title: "Kickoff Party",
                    description: "We start the right way: music, drinks, and the first wave of connections. DJs on deck, cocktails flowing, and conversations that mix markets with mischief."
                }
            ]
        },
        {
            day: "02",
            date: "Jan 29",
            time: "10:00 — 16:00",
            events: [
                {
                    title: "Breakfast & arrival",
                    description: "Coffee, food, and a soft landing for the chaos ahead."
                },
                {
                    title: "Main stage drops",
                    description: "Speakers, chats, and cultural takes that cut through the noise."
                },
                {
                    title: "Lunch & network play",
                    description: "Eat, connect, swap alpha."
                },
                {
                    title: "Evening",
                    description: "Drinks, music, and side quests around Miami."
                }
            ]
        },
        {
            day: "03",
            date: "Jan 30",
            time: "10:00 — 16:00",
            events: [
                {
                    title: "Recovery breakfast",
                    description: "Juice, coffee, maybe hair of the dog."
                },
                {
                    title: "Lightning talks",
                    description: "Short, sharp, and built for the feed."
                },
                {
                    title: "Lunch & open networking",
                    description: "Fuel up and find your people."
                },
                {
                    title: "Collective sessions",
                    description: "Roundtables and group-led conversations."
                },
                {
                    title: "After-hours",
                    description: "One last send-off. Rooftops, music, and the kind of networking that doesn't feel like networking."
                }
            ]
        }
    ];

    return (
        <div className="w-full bg-white rounded-[20px] flex flex-col items-center gap-8 p-6" id="schedule"
             style={{scrollMarginTop: '120px'}}>
            <div className="space-y-4 text-center">
                <div className="bg-[#191919] rounded px-4 py-2 w-fit mx-auto">
                    <h3 className="text-white text-lg font-bold">Schedule</h3>
                </div>
                <h2 className="text-black text-3xl font-bold">
                    Three days. One shared delusion.
                </h2>
            </div>

            <div className="w-full space-y-6">
                {days.map((dayData, index) => (
                    <div key={index} className="space-y-4">
                        <div className="flex flex-col">
                            <div className="flex-1">
                                <div
                                    className="text-6xl font-anton uppercase text-black tracking-tighter leading-[82%]">
                                    Day<span className="text-orange-custom">{dayData.day}</span>
                                </div>
                                <div className="flex justify-between items-center w-full mt-2">
                                    <p className="text-black">{dayData.date}</p>
                                    <p className="text-orange-custom rounded-xl text-sm text-center bg-[#ff46001a] px-3 py-2">{dayData.time}</p>
                                </div>
                            </div>
                            <br/>
                            <div className="flex-1 space-y-4">
                                {dayData.events.map((event, eventIndex) => (
                                    <div key={eventIndex} className="space-y-2 bg-black rounded-3xl p-4">
                                        <p className="text-white text-sm font-medium">
                                            {event.title}
                                        </p>
                                        <p className="text-gray-400 text-xs">
                                            {event.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <br/>
                        <div className="w-full h-px bg-gray-300"/>
                    </div>
                ))}
            </div>

            <div className="text-center">
                <p className="text-black text-base">
                    <span className="text-black">It's not a schedule.</span>{' '}
                    <span className="text-orange-custom">It's a storyline.</span>
                </p>
            </div>
        </div>
    );
};

export default ScheduleModule;